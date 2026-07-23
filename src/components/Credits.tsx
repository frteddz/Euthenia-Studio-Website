import { useScrollReveal } from '../hooks/useScrollReveal';

export function Credits() {
  const labelRef = useScrollReveal<HTMLDivElement>();
  const titleRef = useScrollReveal<HTMLDivElement>();
  const contentRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="credits" className="section" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        <div style={{ maxWidth: 640, marginBottom: '3rem' }}>
          <div ref={labelRef} className="reveal">
            <span className="section-label">Credits</span>
          </div>
          <div ref={titleRef} className="reveal reveal-delay-1">
            <h2 className="section-title">Behind the Studio</h2>
          </div>
        </div>

        <div
          ref={contentRef}
          className="reveal reveal-delay-2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          <CreditCard
            title="Founder"
            items={[
              { label: 'Teddz', description: 'Creator & Developer' },
              { label: 'X / Twitter', description: '@teddzfr' },
              { label: 'Email', description: 'teddzfr@proton.me' },
            ]}
          />

          <CreditCard
            title="Powered By"
            items={[
              { label: 'React', description: 'UI Framework' },
              { label: 'TypeScript', description: 'Language' },
              { label: 'Vite', description: 'Build Tool' },
              { label: 'GitHub Pages', description: 'Hosting' },
            ]}
          />

          <CreditCard
            title="Special Thanks"
            items={[
              {
                label: 'Our Users',
                description: 'Everyone who uses the tools and provides feedback',
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function CreditCard({
  title,
  items,
}: {
  title: string;
  items: { label: string; description: string }[];
}) {
  return (
    <div
      style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        backdropFilter: 'blur(8px)',
      }}
    >
      <h3
        style={{
          fontSize: '0.8125rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--color-accent)',
          marginBottom: '1.25rem',
        }}
      >
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {items.map((item) => (
          <div key={item.label}>
            <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.125rem' }}>
              {item.label}
            </p>
            {item.description && (
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
