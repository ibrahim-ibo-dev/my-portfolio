import { NextRequest, NextResponse } from "next/server";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */

interface ContactBody {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot — must be empty
}

interface ApiResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}

/* ══════════════════════════════════════════════
   Rate Limiter (in-memory, IP-based)
   Max 5 requests per 10 minutes per IP
   ══════════════════════════════════════════════ */

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

const ipRequestMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Periodic cleanup to prevent memory leak (runs at most once per cycle)
function cleanupExpiredEntries() {
  const now = Date.now();
  ipRequestMap.forEach((entry, ip) => {
    if (now > entry.resetAt) ipRequestMap.delete(ip);
  });
}

/* ══════════════════════════════════════════════
   Validation Helpers
   ══════════════════════════════════════════════ */

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/* ══════════════════════════════════════════════
   Email Delivery (Resend)
   ══════════════════════════════════════════════ */

async function sendEmail(name: string, email: string, message: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.CONTACT_EMAIL || "ibrahimhuseein842@gmail.com";

  if (!apiKey) {
    // Development fallback: log a warning, don't fail user-facing request
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Contact] RESEND_API_KEY not set — email not sent (dev mode).");
      return true; // Treat as success in dev so form UX works
    }
    console.error("[Contact] RESEND_API_KEY missing in production.");
    return false;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: ownerEmail,
      subject: `Portfolio Contact: ${name}`,
      replyTo: email,
      text: [
        `New message from your portfolio contact form:`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[Contact] Resend error:", error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[Contact] Email delivery failed:", err instanceof Error ? err.message : "Unknown error");
    return false;
  }
}

/* ══════════════════════════════════════════════
   POST Handler
   ══════════════════════════════════════════════ */

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Periodic cleanup
    cleanupExpiredEntries();

    // Rate limiting
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          errors: { form: "Too many requests. Please try again in a few minutes." },
        },
        { status: 429 }
      );
    }

    const body = (await req.json()) as ContactBody;

    // Honeypot check — bots fill hidden fields
    if (body.website && body.website.trim().length > 0) {
      // Silently accept to not tip off bots, but don't process
      return NextResponse.json(
        { success: true, message: "Thank you! Your message has been received." },
        { status: 200 }
      );
    }

    // Sanitize
    const name = sanitize(body.name ?? "");
    const email = sanitize(body.email ?? "");
    const message = sanitize(body.message ?? "");

    // Validation
    const errors: Record<string, string> = {};

    if (!name || name.length < 2) {
      errors.name = "Name must be at least 2 characters.";
    } else if (name.length > 100) {
      errors.name = "Name must be under 100 characters.";
    }

    if (!email || !validateEmail(email)) {
      errors.email = "Please enter a valid email address.";
    } else if (email.length > 254) {
      errors.email = "Email address is too long.";
    }

    if (!message || message.length < 10) {
      errors.message = "Message must be at least 10 characters.";
    } else if (message.length > 5000) {
      errors.message = "Message must be under 5,000 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Deliver email
    const sent = await sendEmail(name, email, message);

    if (!sent) {
      return NextResponse.json(
        {
          success: false,
          errors: { form: "Unable to send your message right now. Please try again later." },
        },
        { status: 502 }
      );
    }

    // Safe log (no full message body in production)
    if (process.env.NODE_ENV === "production") {
      console.log(`[Contact] Message received from ${name.substring(0, 20)}`);
    } else {
      console.log(`[Contact] Dev — from: ${name}, email: ${email}, length: ${message.length}`);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        errors: { form: "Something went wrong. Please try again later." },
      },
      { status: 500 }
    );
  }
}
