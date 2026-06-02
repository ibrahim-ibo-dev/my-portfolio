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

        {/* SEO-rich content for crawlers — visually hidden but indexable */}
        <div className="sr-only" role="contentinfo" itemScope itemType="https://schema.org/Person">
          <h2>About Ibrahim Hussein</h2>
          <p itemProp="name">Ibrahim Hussein</p>
          <p itemProp="jobTitle">Computer Engineer & AI Developer</p>
          <p itemProp="description">
            Ibrahim Hussein is an award-winning Computer Engineering student at Salahaddin University-Erbil, 
            Kurdistan Region, Iraq. He specializes in artificial intelligence, full-stack web development, 
            and embedded systems. Co-founder of CSAI (Customer Service AI), showcased at HITEX Technology 
            Expo 2025. He builds production-grade applications serving real businesses in Kurdistan and Iraq.
          </p>
          <p>Skills: Python, JavaScript, TypeScript, React, Next.js, PHP, C++, TensorFlow, PyTorch, 
            OpenCV, Arduino, Three.js, GSAP, TailwindCSS, MySQL, Node.js, Machine Learning, 
            Natural Language Processing, Computer Vision, Kurdish NLP</p>
          <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="addressLocality">Erbil</span>, 
            <span itemProp="addressRegion">Kurdistan Region</span>, 
            <span itemProp="addressCountry">Iraq</span>
          </p>
          <a itemProp="url" href="https://ibrahim-eng.dev">ibrahim-eng.dev</a>
          <a itemProp="sameAs" href="https://github.com/ibrahim-ibo-dev">GitHub</a>
          <a itemProp="sameAs" href="https://www.linkedin.com/in/ibrahim-hussein-b080712b7/">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
