export type ProjectCategory = "software" | "hardware";
export type ProjectStatus = "Completed" | "Ongoing" | "Conceptualized";

export interface ProjectHighlight {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  impact?: string;
  highlights?: ProjectHighlight[];
  tags: string[];
  image: string;
  github: string;
  live: string;
  caseStudyUrl?: string;
  gradient: string;
  status: ProjectStatus;
  category: ProjectCategory;
}

export const projects: Project[] = [
  {
    slug: "chat-mart",
    title: "Chat Mart — Omni-Channel SaaS",
    description:
      "Evolution of CSAI into a full multi-company marketplace with 5 messaging channels (WhatsApp, Instagram, Telegram, Viber, Messenger), Kurdish TTS voice replies, RBAC with 17+ permissions, reservation system, and PWA.",
    problem: "CSAI was a single-company chatbot. Businesses needed a scalable platform serving multiple companies across multiple messaging channels.",
    solution: "Rebuilt the platform as a SaaS marketplace with omni-channel AI, token subscriptions, multi-dialect Kurdish support, and a complete admin system with granular permissions.",
    impact: "Deployed at chat-mart.com with its own domain. Serving multiple companies with AI-powered customer service across 5 channels in 3 languages.",
    highlights: [
      { label: "Channels", value: "5 (WhatsApp, IG, TG, Viber, FB)" },
      { label: "Languages", value: "Kurdish + Arabic + English" },
      { label: "Domain", value: "chat-mart.com" },
    ],
    tags: ["SaaS", "AI", "PHP", "WhatsApp API", "PWA"],
    image: "/images/projects/chat-mart.png",
    github: "#",
    live: "https://chat-mart.com",
    caseStudyUrl: "https://case-study.ibrahim-eng.dev/chat-mart",
    gradient: "from-accent/30 to-accent-light/20",
    status: "Completed",
    category: "software",
  },
  {
    slug: "kurdish-chess-ai",
    title: "Kurdish Chess AI — شەترەنجی کوردی",
    description:
      "Full-featured Kurdish-language chess platform with a custom minimax AI engine, Gemini-powered chess coach, mind-reading opponent-intent predictor, game analysis, and daily puzzle training — all in RTL Kurdish.",
    problem: "Kurdish speakers had no dedicated chess platform in their own language, and beginners had no accessible way to learn strategy or get move-by-move coaching.",
    solution: "Built a Next.js chess app with a custom minimax + alpha-beta engine (7 difficulty levels), Google Gemini 2.5 Flash integration for AI opponent moves, coaching, and post-game analysis, plus a mind-reading feature that predicts the opponent's intent — all fully localized in Kurdish Sorani.",
    impact: "Deployed live at chess-ai.ibrahim-eng.dev, giving Kurdish speakers a native-language chess trainer with AI coaching, analysis, and puzzles.",
    highlights: [
      { label: "AI Engine", value: "Custom Minimax + Gemini 2.5" },
      { label: "Difficulty Levels", value: "7 (Beginner → Unlimited)" },
      { label: "Language", value: "Full Kurdish Sorani (RTL)" },
    ],
    tags: ["Next.js", "AI", "Gemini API", "chess.js", "TypeScript", "RTL"],
    image: "/images/projects/kurdish-chess-ai.png",
    github: "https://github.com/ibrahim-ibo-dev/kurdish-chess-AI",
    live: "https://chess-ai.ibrahim-eng.dev",
    caseStudyUrl: "https://case-study.ibrahim-eng.dev/kurdish-chess-ai",
    gradient: "from-accent-light/30 to-accent/20",
    status: "Completed",
    category: "software",
  },
  {
    slug: "true-prence",
    title: "True Prence",
    description:
      "Face recognition attendance system identifying up to 20 students per frame simultaneously. CNN (GPU) or HOG (CPU) detection, SQLite storage, Tkinter UI, Excel/PDF/chart exports.",
    problem: "Manual attendance tracking in classrooms and workplaces is slow, error-prone, and easily gamed by proxy attendance.",
    solution: "Built a single-file face recognition system using dlib CNN/HOG detection, processing 20 faces per frame with automatic GPU detection, full SQLite data model, and export pipelines.",
    impact: "Enables passive, zero-interaction attendance for full classrooms — students are marked present simply by being visible to the camera.",
    highlights: [
      { label: "Faces per frame", value: "Up to 20" },
      { label: "Detection", value: "CNN + HOG" },
      { label: "GPU", value: "CUDA / dlib" },
    ],
    tags: ["AI", "Python", "OpenCV", "face_recognition", "SQLite"],
    image: "/images/projects/true-prence.jpg",
    github: "https://github.com/ibrahim-ibo-dev/Attendance-System",
    live: "#",
    caseStudyUrl: "https://case-study.ibrahim-eng.dev/attendance",
    gradient: "from-accent-light/30 to-accent/20",
    status: "Completed",
    category: "software",
  },
  {
    slug: "signed-language",
    title: "Signed Language",
    description:
      "Real-time gesture recognition using MediaPipe hand/body tracking combined with a custom-trained KNN classifier. Features incremental learning, 3× data augmentation, and temporal dynamics analysis.",
    problem: "~250,000 people in Kurdistan with hearing/speech difficulties need accessible communication tools without expensive hardware.",
    solution: "Built a software-only gesture recognizer using MediaPipe (hands, face mesh, pose) and a KNN model with incremental training, confusion tracking, and augmentation — works with any standard webcam.",
    impact: "Demonstrates that sign language recognition is achievable with zero specialized hardware, using only a laptop camera.",
    highlights: [
      { label: "Tracking", value: "Hands + Face + Pose" },
      { label: "Model", value: "KNN (k=3)" },
      { label: "Learning", value: "Incremental" },
    ],
    tags: ["AI", "Python", "MediaPipe", "KNN", "scikit-learn"],
    image: "/images/projects/signed-language.jpg",
    github: "https://github.com/ibrahim-ibo-dev/AI-Sign-Language",
    live: "#",
    caseStudyUrl: "https://case-study.ibrahim-eng.dev/gestures",
    gradient: "from-accent/30 to-accent-light/20",
    status: "Completed",
    category: "software",
  },
  {
    slug: "bradaran",
    title: "Bradaran — Car Dealership",
    description: "Full car dealership management system with inventory tracking, customer management, sales pipeline, RBAC permissions, PWA support, and RTL Kurdish interface.",
    problem: "Car dealerships in Kurdistan relied on paper and spreadsheets. No centralized system to track inventory, sales, or customer history.",
    solution: "Built a complete PHP/MySQL dealership platform with role-based access, push notifications, PWA installability, and full RTL Kurdish support.",
    impact: "Deployed for a real client — managing full dealership operations digitally with multi-role staff access.",
    highlights: [
      { label: "Stack", value: "PHP + MySQL" },
      { label: "RTL", value: "Full Kurdish" },
      { label: "PWA", value: "Installable" },
    ],
    tags: ["PHP", "MySQL", "PWA", "RBAC", "RTL Kurdish"],
    image: "/images/projects/bradar.png",
    github: "#",
    live: "#",
    caseStudyUrl: "https://case-study.ibrahim-eng.dev/xara",
    gradient: "from-accent-light/30 to-accent/20",
    status: "Completed",
    category: "software",
  },
  {
    slug: "dyari",
    title: "Dyari — Advanced Car Dealership",
    description: "Advanced evolution of Bradaran with dual-database architecture, PDO, enhanced RBAC with 17+ permissions, installment tracking, and full PWA with push notifications.",
    problem: "Bradaran was a single-database system. Larger dealerships needed separate operational and archival databases with more granular permissions.",
    solution: "Redesigned with dual-database PDO architecture, expanded permission system, installment payment tracking, and enhanced push notification system.",
    impact: "Built for a real client in 2025. Handles full dealership operations with advanced financial tracking.",
    highlights: [
      { label: "Architecture", value: "Dual Database" },
      { label: "Permissions", value: "17+ RBAC" },
      { label: "Payments", value: "Installment Tracking" },
    ],
    tags: ["PHP", "MySQL", "Dual DB", "PDO", "PWA", "RBAC"],
    image: "/images/projects/dyari-car.png",
    github: "#",
    live: "#",
    caseStudyUrl: "https://case-study.ibrahim-eng.dev/diari",
    gradient: "from-accent/30 to-accent-light/20",
    status: "Completed",
    category: "software",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
