"use client";

import {experiences} from "./journey-data";
import Achievements from "./Achievements";

export default function Journey() {
  return <>
    <section id="experience" className="nx-journey nx-container" aria-labelledby="experience-heading" data-scroll-section>
      <div className="nx-journey-intro"><span className="nx-section-label">04 / THE JOURNEY</span><h2 id="experience-heading" className="nx-section-heading">The work behind<br /><span>the work.</span></h2><p>Teams, communities and creative challenges that shaped how I build.</p><span className="nx-journey-note"><i />TECHNOLOGY MEETS PEOPLE</span></div>
      <div className="nx-mobile-chapter" aria-hidden="true"><span>04 / THE JOURNEY</span><span>The work behind the work.</span><i /></div>
      <div className="nx-experience-list">{experiences.map((item, index) => <details className="nx-experience-row" key={item.company} open={index === 0}>
        <summary><span className="nx-experience-year">{item.period}</span><div><span className="nx-experience-company">{item.company}</span><h3>{item.role}</h3></div><span className="nx-experience-toggle" aria-hidden="true"><i /><i /></span></summary>
        <div className="nx-experience-body"><p>{item.description}</p><div className="nx-experience-tags">{item.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><span className="nx-experience-location">{item.location}</span></div>
      </details>)}</div>
    </section>
    <Achievements/>
  </>;
}
