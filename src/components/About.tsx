import { Shield, Zap, Globe, Code, User, Mail } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const values = [
  {
    icon: User,
    title: 'Built by One Dev',
    description: 'Euthenia Studio is a one-person software studio. Every project is crafted with care by Teddz.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All tools run entirely in your browser. No data is ever sent to a server.',
  },
  {
    icon: Code,
    title: 'Open to Contributors',
    description: 'Want to publish your project here? Email teddzfr@proton.me — let\'s build something together.',
  },
  {
    icon: Globe,
    title: 'Always Free at Core',
    description: 'The essential features of every tool are free forever. No paywalls, no tricks.',
  },
];

export function About() {
  const labelRef = useScrollReveal<HTMLDivElement>();
  const titleRef = useScrollReveal<HTMLDivElement>();
  const descriptionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" className="section" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: '3.5rem' }}>
          <div ref={labelRef} className="reveal">
            <span className="section-label">About</span>
          </div>
          <div ref={titleRef} className="reveal reveal-delay-1">
            <h2 className="section-title">A One-Person Studio</h2>
          </div>
          <div ref={descriptionRef} className="reveal reveal-delay-2">
            <p className="section-subtitle">
              Euthenia Studio is my personal software studio — a place to publish the tools and
              projects I build. Everything here is made by me, Teddz, one developer at a time.
            </p>
            <p
              className="section-subtitle"
              style={{ marginTop: '1rem', color: 'var(--color-text-tertiary)', fontSize: '0.9375rem' }}
            >
              I believe software should be simple, fast, and respect your privacy. All my projects
              are open source. If you have a project you'd like to publish under Euthenia Studio,
              <a href="mailto:teddzfr@proton.me" style={{ color: 'var(--color-accent)', textDecoration: 'underline', marginLeft: '0.25rem' }}>email me</a>.
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {values.map((item, i) => (
            <ValueCard key={item.title} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: typeof Shield;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${Math.min(index + 1, 4)}`}
      style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        backdropFilter: 'blur(8px)',
        transition: 'all var(--transition-normal)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(251, 225, 52, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--color-border)';
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 'var(--radius-md)',
          background: 'rgba(251, 225, 52, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          color: 'var(--color-accent)',
        }}
      >
        <Icon size={18} />
      </div>
      <h3
        style={{
          fontSize: '1rem',
          fontWeight: 700,
          marginBottom: '0.375rem',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  );
}
