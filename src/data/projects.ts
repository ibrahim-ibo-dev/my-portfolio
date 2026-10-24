export type ProjectCategory = "software" | "hardware";
export type ProjectStatus = "Completed" | "Ongoing" | "Conceptualized" | "Prototype";

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
  imageAlt?: string;
  showcase?: {
    discipline: string;
    summary: string;
    feature: string;
  };
  gallery?: { image: string; alt: string; caption: string }[];
  github: string;
  live: string;
  caseStudyUrl?: string;
  gradient: string;
  status: ProjectStatus;
  category: ProjectCategory;
}

export const projects: Project[] = [
  {
    slug: "cosmic-scale",
    title: "Cosmic Scale Visualizer",
    description:
      "An interactive journey from a proton to the observable universe, with 12 reference scales, a logarithmic zoom system, and a Kurdish Sorani interface.",
    problem: "Scientific distances and sizes span orders of magnitude that are difficult to picture from numbers alone.",
    solution: "Built a visual scale explorer with logarithmic navigation, illustrated reference objects, and Kurdish explanations. Scroll, click, or use the keyboard to move between scales.",
    impact: "Makes the relationship between microscopic, human, planetary, and cosmic scales easier to explore. Values are approximate educational references rather than a precision measurement tool.",
    highlights: [
      { label: "Reference scales", value: "12" },
      { label: "Navigation", value: "Logarithmic zoom" },
      { label: "Language", value: "Kurdish Sorani" },
    ],
    tags: ["Next.js", "React", "TypeScript", "Data Visualization", "RTL"],
    image: "/images/projects/cosmic-scale.jpg",
    imageAlt: "Cosmic Scale Visualizer showing Earth and its scale in a Kurdish interface",
    showcase: {
      discipline: "Science & exploration",
      summary: "From a proton to the observable universe. A different perspective at every scale.",
      feature: "12 reference scales · Logarithmic navigation",
    },
    gallery: [{ image: "/images/projects/cosmic-scale-detail.jpg", alt: "A second reference scale inside Cosmic Scale Visualizer", caption: "Move between reference scales while keeping their relative size in view." }],
    github: "#",
    live: "#",
    caseStudyUrl: "https://case-study.ibrahim-eng.dev/cosmic-scale",
    gradient: "from-accent/20 to-accent-light/10",
    status: "Completed",
    category: "software",
  },
  {
    slug: "algorithm-playground",
    title: "Algorithm Playground",
    description:
      "ئەلگۆریتم — a Kurdish Sorani playground for seeing how algorithms work, with 16 sorting, searching, pathfinding, and maze algorithms, plus Conway’s Game of Life.",
    problem: "Reading an algorithm does not always explain how its state changes. Learners need a way to slow down, inspect a step, and try their own input.",
    solution: "Built a reversible playback engine with synchronized pseudocode, a scrubbable timeline, adjustable speed, and live operation counts. Editable grids support walls, weighted cells, maze generation, and pathfinding.",
    impact: "Provides a hands-on learning environment in Kurdish: follow an algorithm, rewind its recorded steps, and connect its code to its behavior. Conway’s Game of Life runs as a separate forward simulation.",
    highlights: [
      { label: "Algorithms", value: "16 + Game of Life" },
      { label: "Playback", value: "Step & rewind" },
      { label: "Learning", value: "Code + live statistics" },
    ],
    tags: ["Next.js", "TypeScript", "Zustand", "Canvas", "Algorithms"],
    image: "/images/projects/algorithm-playground.jpg",
    imageAlt: "Quick Sort running in Algorithm Playground with highlighted pseudocode and Kurdish learning controls",
    showcase: {
      discipline: "Computer science & learning",
      summary: "See the logic. Follow each step. Learn algorithms through a Kurdish interface.",
      feature: "16 algorithms · Reversible playback",
    },
    gallery: [{ image: "/images/projects/algorithm-playground-detail.jpg", alt: "A maze solved with Dijkstra in Algorithm Playground", caption: "Generate a maze, then follow Dijkstra as it finds a path through it." }],
    github: "#",
    live: "#",
    caseStudyUrl: "https://case-study.ibrahim-eng.dev/algorithm-playground",
    gradient: "from-accent-light/20 to-accent/10",
    status: "Completed",
    category: "software",
  },
  {
    slug: "glyphcode",
    title: "GlyphCode",
    description:
      "An experimental visual data code that encodes text into waves, rings, spirals, and leaf shapes, with local generation and a custom camera and image decoder.",
    problem: "Could a visual code carry data through more expressive shapes while remaining locally decodable?",
    solution: "Designed a custom UTF-8 frame format with CRC32 verification and Reed–Solomon error correction, six visual styles, and a browser-based scanning pipeline. The drawing carries the data directly, without a server lookup or a hidden QR code.",
    impact: "A working exploration of visual encoding and browser-based computer vision. It is a prototype with limited capacity and perspective tolerance, rather than a replacement for standard QR codes.",
    highlights: [
      { label: "Visual styles", value: "6" },
      { label: "Processing", value: "Local / offline" },
      { label: "Error correction", value: "Reed–Solomon" },
    ],
    tags: ["Next.js", "TypeScript", "Canvas", "Computer Vision", "PWA"],
    image: "/images/projects/glyphcode.jpg",
    imageAlt: "GlyphCode generator displaying a leaf-shaped visual code and successful local verification",
    showcase: {
      discipline: "Creative coding & computer vision",
      summary: "Text becomes a shape. An experiment in visual codes beyond the square.",
      feature: "6 visual styles · Local encoding & decoding",
    },
    gallery: [{ image: "/images/projects/glyphcode-detail.jpg", alt: "A wave-shaped visual code generated inside GlyphCode", caption: "Shared encoding, different geometries: waves, circles, spirals, and leaves." }],
    github: "#",
    live: "#",
    caseStudyUrl: "https://case-study.ibrahim-eng.dev/glyphcode",
    gradient: "from-accent/20 to-accent-light/10",
    status: "Prototype",
    category: "software",
  },
  {
    slug: "kurdistan-weather",
    title: "Kurdistan Weather",
    description:
      "A Kurdish Sorani weather app with live conditions, hourly and seven-day forecasts, and an atmospheric interface that responds to the weather and time of day.",
    problem: "Weather information should feel natural to read in Kurdish and make current conditions easy to understand at a glance.",
    solution: "Combined Open-Meteo forecasts with city search, optional browser location, Kurdish-Indic digits, and a fully RTL layout. Custom animated weather icons and a changing sky reflect the current conditions and daylight phase.",
    impact: "Available at weather.ibrahim-eng.dev, bringing current conditions and upcoming forecasts together in an interface designed for Kurdish speakers.",
    highlights: [
      { label: "Forecast", value: "Hourly + 7 days" },
      { label: "Weather data", value: "Open-Meteo" },
      { label: "Interface", value: "Kurdish / RTL" },
    ],
    tags: ["Next.js", "React", "Open-Meteo", "SVG Animation", "RTL"],
    image: "/images/projects/kurdistan-weather.jpg",
    imageAlt: "Kurdistan Weather showing live conditions and a forecast in Kurdish Sorani",
    showcase: {
      discipline: "Everyday tools & local design",
      summary: "A forecast that feels local. Kurdish weather, with a sky that changes with the day.",
      feature: "Live conditions · Hourly & 7-day forecasts",
    },
    gallery: [{ image: "/images/projects/kurdistan-weather-detail.jpg", alt: "Detailed forecast inside Kurdistan Weather", caption: "Current conditions, an hourly outlook, and the week ahead in one Kurdish interface." }],
    github: "#",
    live: "https://weather.ibrahim-eng.dev",
    caseStudyUrl: "https://case-study.ibrahim-eng.dev/kurdistan-weather",
    gradient: "from-accent-light/20 to-accent/10",
    status: "Completed",
    category: "software",
  },
  {
    slug: "rashkaw-media",
    title: "Rashkaw Media",
    description:
      "Full trilingual news platform for Rashkaw Media — editorial sections, live sports & news coverage, currency & gold market, Kurdistan weather, polls and surveys, and a dedicated admin panel, custom-built to the client's specification.",
    problem: "A Kurdish newsroom needed more than a CMS theme — a custom editorial platform with live coverage, market/weather data, polls, and three language editions, designed entirely around their own workflow.",
    solution: "Designed and built end-to-end: a Next.js public frontend, a dedicated REST API backend, and a standalone React admin panel — with trilingual Kurdish/Arabic/English routing and SEO built in.",
    impact: "Live at rashkaw.news and indexed on Google. The codebase is private and owned by the client.",
    highlights: [
      { label: "Languages", value: "CKB / AR / EN" },
      { label: "Live Coverage", value: "Sports + News" },
      { label: "Engagement", value: "Polls & Surveys" },
    ],
    tags: ["Next.js", "TypeScript", "Express", "MongoDB", "i18n", "RTL"],
    image: "/images/projects/rashkaw-media.png",
    github: "#",
    live: "https://rashkaw.news",
    caseStudyUrl: "https://case-study.ibrahim-eng.dev/rashkaw-media",
    gradient: "from-accent/30 to-accent-light/20",
    status: "Completed",
    category: "software",
  },
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
