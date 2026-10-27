import PortfolioRedesign from "@/components/redesign/PortfolioRedesign";
import {featuredWritings,featuredVideos} from "@/data/featured-expression";

export default function Home() {
  return <><link rel="preload" as="image" href="/images/backgrounds/aurora-desktop.webp" type="image/webp" media="(orientation: landscape)" fetchPriority="high"/><link rel="preload" as="image" href="/images/backgrounds/aurora-mobile.webp" type="image/webp" media="(orientation: portrait)" fetchPriority="high"/><PortfolioRedesign writings={featuredWritings} videos={featuredVideos}/></>;
}
