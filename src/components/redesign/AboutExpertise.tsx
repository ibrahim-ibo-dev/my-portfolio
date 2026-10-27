import Image from "next/image";

const capabilities = [
  { name: "Full-stack development", detail: "Complete web systems, from database schema to UI, built with Next.js, Python, PHP and MySQL." },
  { name: "AI-powered applications", detail: "Customer service agents, Kurdish NLP systems and multi-provider API pipelines." },
  { name: "Hardware & embedded systems", detail: "Arduino, sensors and integrated circuits — from prototype to working product." },
  { name: "Systems architecture", detail: "A clear structure for APIs, databases, authentication and deployment pipelines." },
];

const skillGroups = [
  { name: "Frontend", subtitle: "The experience people see.", icon: "01", skills: ["React", "Next.js", "TypeScript", "HTML", "CSS"] },
  { name: "Backend", subtitle: "The systems that make it work.", icon: "02", skills: ["Node.js", "Express", "Laravel", "PHP", "Python", "C++", "C#", "REST API"] },
  { name: "Database", subtitle: "A reliable foundation for data.", icon: "03", skills: ["MySQL", "MongoDB", "Firebase"] },
  { name: "AI & tools", subtitle: "Intelligence, hardware and craft.", icon: "04", skills: ["AI / ML", "Robotics", "Arduino", "MATLAB", "Git", "GitHub", "Linux", "DaVinci", "Photoshop", "Audition", "Audacity", "React Dev"] },
];

export default function AboutExpertise() {
  return <>
    <section id="about" className="nx-about nx-container" aria-labelledby="about-heading">
      <div className="nx-about-heading">
        <span className="nx-section-label">02 / THE PERSON BEHIND THE CODE</span>
        <h2 id="about-heading" className="nx-section-heading">Curiosity is the start.<br /><span>Building is the point.</span></h2>
      </div>
      <div className="nx-about-layout">
        <figure className="nx-portrait">
          <div className="nx-portrait-image"><Image src="/images/profile.jpg" alt="Ibrahim Hussein — Computer Engineer and AI Developer from Kurdistan Region, Iraq" fill sizes="(max-width: 700px) 90vw, 420px" className="nx-profile-photo" /><div className="nx-portrait-shade" aria-hidden="true" /><div className="nx-portrait-coordinates" aria-hidden="true"><span>ERBIL, KURDISTAN</span><i /></div><div className="nx-portrait-overlay"><span>IBRAHIM HUSSEIN</span><p>Engineer. Developer.<br />Always a builder.</p></div></div>
          <figcaption className="nx-portrait-caption"><span>THE MINDSET</span><p>Learn deeply. Build thoughtfully.</p><span aria-hidden="true">↗</span></figcaption>
        </figure>
        <div className="nx-about-content">
          <p className="nx-about-intro">I connect <span>software, intelligence<br className="nx-about-desktop-break" /> and the physical world.</span></p>
          <div className="nx-biography"><p>I&apos;m a Computer Engineering student at <strong>Lebanese French University</strong>, Erbil. My core is full-stack development and hardware systems — from writing C++ firmware for embedded devices to deploying full web platforms with AI backends.</p><p>I co-founded <strong>CSAI</strong>, showcased at <strong>HITEX 2025</strong>, and shipped <strong>Chat Mart</strong>, an omni-channel SaaS platform serving real businesses. Alongside that, I&apos;ve built <strong>30+ hardware projects</strong> and led software development for <strong>70+ members</strong> at NICER Club.</p></div>
          <div className="nx-capability-list">{capabilities.map((item, index) => <article key={item.name}><span className="nx-capability-index">0{index + 1}</span><div><h3>{item.name}</h3><p>{item.detail}</p></div><span className="nx-capability-mark" aria-hidden="true">↗</span></article>)}</div>
        </div>
      </div>
    </section>
    <section id="skills" className="nx-expertise nx-container" aria-labelledby="skills-heading">
      <div className="nx-expertise-heading"><div><span className="nx-section-label">03 / MY TOOLKIT</span><h2 id="skills-heading" className="nx-section-heading">Across the stack.<br /><span>Beyond the screen.</span></h2></div><p>The tools change with the problem.<br />The goal stays the same: make it work beautifully.</p></div>
      <div className="nx-skill-grid">{skillGroups.map(group => <article className="nx-skill-panel" key={group.name}><div className="nx-skill-top"><span className="nx-skill-symbol" aria-hidden="true">{group.icon === "01" ? "</>" : group.icon === "02" ? "{ }" : group.icon === "03" ? "[ ]" : "✳"}</span><span className="nx-skill-count">{String(group.skills.length).padStart(2, "0")} TOOLS</span></div><h3>{group.name}</h3><p>{group.subtitle}</p><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul><span className="nx-skill-panel-index" aria-hidden="true">{group.icon}</span></article>)}</div>
    </section>
  </>;
}
