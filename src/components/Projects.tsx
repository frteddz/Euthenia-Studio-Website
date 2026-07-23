import { useScrollReveal } from '../hooks/useScrollReveal';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

const categories = [
  { key: 'tools' as const, label: 'Utilities', icon: '⚙' },
  { key: 'creative' as const, label: 'Creative', icon: '✦' },
  { key: 'games' as const, label: 'Games', icon: '◆' },
];

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
            <h2 className="section-title">Our Projects</h2>
          </div>
          <div ref={subtitleRef} className="reveal reveal-delay-2">
            <p className="section-subtitle">
              Free tools, creative apps, and games — all built with privacy and simplicity in mind.
            </p>
          </div>
        </div>

        {categories.map((cat) => {
          const catProjects = projects.filter((p) => p.category === cat.key);
          if (catProjects.length === 0) return null;
          return (
            <div key={cat.key} style={{ marginBottom: '2.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.02em',
              }}>
                <span style={{ fontSize: '1rem' }}>{cat.icon}</span>
                {cat.label}
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: 'var(--color-text-tertiary)',
                  background: 'var(--color-card-bg)',
                  padding: '0.125rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                }}>
                  {catProjects.length}
                </span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
              }}>
                {catProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
