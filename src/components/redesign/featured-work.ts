import { projects, type Project } from "@/data/projects";

type FeaturedDetail = {
  slug: string;
  title: string;
  category: string;
  address: string;
  caption: string;
  facts: { value: string; label: string }[];
};

const curated: FeaturedDetail[] = [
  {
    slug: "chat-mart", title: "Chat Mart", category: "AI & BUSINESS SYSTEMS",
    address: "chat-mart.com", caption: "Many conversations. One connected business.",
    facts: [{ value: "05", label: "Messaging platforms" }, { value: "SaaS", label: "Built for multiple companies" }],
  },
  {
    slug: "rashkaw-media", title: "Rashkaw Media", category: "CLIENT PLATFORM",
    address: "rashkaw.news", caption: "A newsroom. Three languages. One platform.",
    facts: [{ value: "03", label: "Language editions" }, { value: "Full stack", label: "From API to interface" }],
  },
  {
    slug: "kurdish-chess-ai", title: "Kurdish Chess AI", category: "APPLIED AI",
    address: "chess-ai.ibrahim-eng.dev", caption: "A familiar language. A deeper way to learn chess.",
    facts: [{ value: "07", label: "Difficulty levels" }, { value: "Minimax", label: "Custom chess engine" }],
  },
  {
    slug: "algorithm-playground", title: "Algorithm Playground", category: "INTERACTIVE LEARNING",
    address: "algorithm playground / کوردی", caption: "See the logic. Follow every step.",
    facts: [{ value: "16", label: "Algorithms to explore" }, { value: "Rewind", label: "Reversible playback" }],
  },
];

export type FeaturedWork = FeaturedDetail & { project: Project };
export const featuredWork: FeaturedWork[] = curated.flatMap(detail => {
  const project = projects.find(item => item.slug === detail.slug);
  return project ? [{ ...detail, project }] : [];
});
