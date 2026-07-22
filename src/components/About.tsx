import { Shield, Zap, Globe, Code } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const values = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All tools run entirely in your browser. No data is ever sent to a server.',
  },
  {
    icon: Zap,
    title: 'Fast & Lightweight',
    description: 'Built with performance in mind. No bloat, no unnecessary dependencies.',
  },
  {
    icon: Code,
    title: 'Modern Stack',
    description: 'Built with React, TypeScript, and Tauri for a native-like experience.',
  },
  {
    icon: Globe,
    title: 'Free for Everyone',
    description: 'All tools are free to use. No paywalls, no subscriptions, no hidden costs.',
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
            <h2 className="section-title">Independent Software Studio</h2>
          </div>
          <div ref={descriptionRef} className="reveal reveal-delay-2">
            <p className="section-subtitle">
              Euthenia Studio is a small independent software studio focused on building practical,
              well-crafted utilities. Every tool is designed to solve real problems — nothing more,
              nothing less.
            </p>
            <p
              className="section-subtitle"
              style={{ marginTop: '1rem', color: 'var(--color-text-tertiary)', fontSize: '0.9375rem' }}
            >
              We believe software should be simple, fast, and respect your privacy. Wherever
              possible, our projects are open source so anyone can inspect, learn from, and
              contribute to them.
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
