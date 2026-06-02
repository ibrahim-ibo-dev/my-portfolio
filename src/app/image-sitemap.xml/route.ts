import { projects } from '@/data/projects'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ibrahim-eng.dev"

  const projectImages = projects.map((project) => `
    <url>
      <loc>${baseUrl}/projects/${project.slug}</loc>
      <image:image>
        <image:loc>${baseUrl}${project.image}</image:loc>
        <image:title>${project.title}</image:title>
        <image:caption>${project.description.slice(0, 120)}</image:caption>
      </image:image>
    </url>`).join('')

  const achievementImages = [
    { file: 'ctf-competition.png', title: '1st Place Kurdistan CTF Competition' },
    { file: 'nicer-home-system.jpg', title: 'NICER Club Home System Project Certificate' },
    { file: 'coding-competition.jpg', title: 'Cihan University Coding Competition' },
    { file: 'codesignal.jpg', title: 'CodeSignal Advanced Certification' },
    { file: 'ai-training.jpg', title: 'AI Training Program Certificate' },
    { file: 'ecs-true-prence.jpg', title: 'ECS True Prence Presentation' },
    { file: 'ecs-signed-language.jpg', title: 'ECS Signed Language Presentation' },
  ].map((img) => `
    <url>
      <loc>${baseUrl}/#credentials</loc>
      <image:image>
        <image:loc>${baseUrl}/images/achievements/${img.file}</image:loc>
        <image:title>${img.title} - Ibrahim Hussein</image:title>
        <image:caption>${img.title} achieved by Ibrahim Hussein, Computer Engineer from Kurdistan</image:caption>
      </image:image>
    </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <url>
      <loc>${baseUrl}</loc>
      <image:image>
        <image:loc>${baseUrl}/images/profile.jpg</image:loc>
        <image:title>Ibrahim Hussein - Computer Engineer & AI Developer</image:title>
        <image:caption>Ibrahim Hussein, Computer Engineering student and AI developer from Kurdistan Region, Iraq</image:caption>
      </image:image>
      <image:image>
        <image:loc>${baseUrl}/og-image.png</image:loc>
        <image:title>Ibrahim Hussein Portfolio</image:title>
        <image:caption>Portfolio website of Ibrahim Hussein showcasing AI and web development projects</image:caption>
      </image:image>
    </url>${projectImages}${achievementImages}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
