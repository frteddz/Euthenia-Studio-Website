import { useScrollReveal } from '../hooks/useScrollReveal';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  const labelRef = useScrollReveal<HTMLDivElement>();
  const titleRef = useScrollReveal<HTMLDivElement>();
  const subtitleRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="projects" className="section" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <div ref={labelRef} className="reveal">
            <span className="section-label">Projects</span>
          </div>
          <div ref={titleRef} className="reveal reveal-delay-1">
            <h2 className="section-title">Our Tools</h2>
          </div>
          <div ref={subtitleRef} className="reveal reveal-delay-2">
            <p className="section-subtitle">
              Free, privacy-focused utilities built with modern technology. Each tool is designed
              to solve a specific problem without unnecessary complexity.
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
