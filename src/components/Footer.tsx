import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const footerLinks = [
  { icon: FiGithub, href: "https://github.com/ibrahim-ibo-dev", label: "GitHub" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/ibrahim-hussein-b080712b7/", label: "LinkedIn" },
  { icon: FiMail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=ibrahimhuseein842@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-primary">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <span className="text-sm font-semibold text-gradient">Ibrahim Hussein</span>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ibrahimhuseein842@gmail.com" target="_blank" rel="noopener noreferrer" className="text-sm text-subtle hover:text-accent transition-colors font-mono">
              ibrahimhuseein842@gmail.com
            </a>
            <p className="text-caption text-subtle">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              {footerLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="w-9 h-9 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-subtle hover:text-accent hover:border-accent/20 transition-all duration-400 ease-premium focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                  aria-label={href.startsWith("mailto:") ? label : `${label} (opens in new tab)`}
                >
                  <Icon className="text-sm" aria-hidden="true" />
                </a>
              ))}
            </div>
            <a 
              href="mailto:ibrahimhuseein842@gmail.com"
              className="text-xs text-subtle hover:text-accent transition-colors duration-300"
            >
              ibrahimhuseein842@gmail.com
            </a>
          </div>

          {/* Tagline */}
          <p className="text-caption text-subtle font-mono">
            Crafted with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
