import { ArrowRight, GitBranch, ExternalLink, Mail } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Hero() {
  const titleRef = useScrollReveal<HTMLDivElement>();
  const subtitleRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>();
  const actionsRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'var(--nav-height)',
      }}
    >
      <div style={{ textAlign: 'center', padding: '2rem 1.5rem', maxWidth: 720 }}>
        <div ref={titleRef} className="reveal">
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              marginBottom: '1.25rem',
            }}
          >
            <span style={{ color: 'var(--color-accent)' }}>Euthenia</span>{' '}
            <span style={{ color: 'var(--color-text-primary)' }}>Studio</span>
          </h1>
        </div>

        <div ref={subtitleRef} className="reveal reveal-delay-1">
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              maxWidth: 520,
              margin: '0 auto 2.5rem',
            }}
          >
            A small independent software studio building practical, privacy-first tools.
          </p>
        </div>

        <div
          ref={statsRef}
          className="reveal reveal-delay-2"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {[
            { value: '21', label: 'Projects' },
            { value: '100%', label: 'Free' },
            { value: 'Zero', label: 'Servers' },
            { value: '1', label: 'Developer' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'var(--color-card-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1.25rem',
                minWidth: 100,
                textAlign: 'center',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-accent)', letterSpacing: '-0.03em' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', marginTop: '0.125rem' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={actionsRef}
          className="reveal reveal-delay-3"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <a
            data-sound="click"
            href="#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-accent)',
              color: 'var(--onyx)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              transition: 'all var(--transition-normal)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-accent-hover)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(251, 225, 52, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-accent)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Explore Projects
            <ArrowRight size={16} />
          </a>

          <a
            data-sound="click"
            href="https://github.com/frteddz"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-glass)',
              color: 'var(--color-text-primary)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              transition: 'all var(--transition-normal)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.background = 'rgba(251, 225, 52, 0.06)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.background = 'var(--color-glass)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <GitBranch size={16} />
            GitHub
          </a>
          <a
            data-sound="click"
            href="https://x.com/teddzfr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-glass)',
              color: 'var(--color-text-primary)',
              fontWeight: 600,
              fontSize: '0.9375rem',
              transition: 'all var(--transition-normal)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.background = 'rgba(251, 225, 52, 0.06)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.background = 'var(--color-glass)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <ExternalLink size={16} />
            X / Twitter
          </a>
        </div>

        <div
          className="reveal reveal-delay-4"
          style={{
            marginTop: '3rem',
            padding: '0.875rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-card-bg)',
            border: '1px solid var(--color-border)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          <Mail size={16} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
          <span>Want to publish your project here?</span>
          <a
            href="mailto:teddzfr@proton.me"
            style={{
              color: 'var(--color-accent)',
              fontWeight: 600,
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            }}
          >
            teddzfr@proton.me
          </a>
        </div>
      </div>
    </section>
  );
}
