import { ArrowLeft, Check, ExternalLink, Star } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePageMeta } from '../hooks/usePageMeta';
import { toolDetails } from '../data/toolDetails';

interface ToolDetailProps {
  toolId: string;
  onNavigate: (page: string) => void;
}

function GoldButton({ children, onClick, href, style }: { children: React.ReactNode; onClick?: () => void; href?: string; style?: React.CSSProperties }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 2rem',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-accent)',
    color: 'var(--onyx)',
    fontWeight: 700,
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'inherit',
    transition: 'all var(--transition-normal)',
    ...style,
  } as React.CSSProperties;

  if (href) {
    return <a href={href} style={base} target="_blank" rel="noopener noreferrer">{children}</a>;
  }
  return <button onClick={onClick} style={base}>{children}</button>;
}

export function ToolDetail({ toolId, onNavigate }: ToolDetailProps) {
  const tool = toolDetails.find((t) => t.id === toolId);

  const titleRef = useScrollReveal<HTMLDivElement>();
  const taglineRef = useScrollReveal<HTMLDivElement>();
  const descRef = useScrollReveal<HTMLDivElement>();
  const featuresRef = useScrollReveal<HTMLDivElement>();
  const whyRef = useScrollReveal<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();

  usePageMeta(tool?.metaTitle || 'Tool - Euthenia Studio', tool?.metaDescription || '');

  if (!tool) {
    return (
      <div style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', textAlign: 'center', padding: '8rem 1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Tool not found</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>The tool you are looking for does not exist.</p>
        <button onClick={() => onNavigate('home')} style={{ color: 'var(--color-accent)', fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', fontSize: '1rem' }}>
          Go back home
        </button>
      </div>
    );
  }

  const paragraphs = tool.description.split('\n').filter(Boolean);

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '6rem' }}>
      <div className="container">
        <div ref={titleRef} className="reveal" style={{ marginBottom: '0.5rem' }}>
          <button
            onClick={() => onNavigate('home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.875rem',
              color: 'var(--color-text-tertiary)',
              cursor: 'pointer',
              marginBottom: '2rem',
              background: 'none',
              border: 'none',
              fontFamily: 'inherit',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-tertiary)'; }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>

        <div ref={taglineRef} className="reveal reveal-delay-1" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{
            width: 64, height: 64,
            borderRadius: 'var(--radius-lg)',
            background: 'rgba(251, 225, 52, 0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', flexShrink: 0,
          }}>
            {tool.icon}
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              {tool.name}
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
              {tool.tagline}
            </p>
          </div>
        </div>

        <div ref={descRef} className="reveal reveal-delay-2" style={{
          maxWidth: 720,
          marginBottom: '4rem',
        }}>
          {paragraphs.map((text, i) => (
            <p key={i} style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              marginBottom: '1.25rem',
            }}>
              {text}
            </p>
          ))}
        </div>

        <div ref={featuresRef} className="reveal reveal-delay-3" style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Key Features
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '0.75rem',
          }}>
            {tool.features.map((feature, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                padding: '1rem 1.25rem',
                background: 'var(--color-card-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
              }}>
                <Check size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div ref={whyRef} className="reveal reveal-delay-4" style={{
          marginBottom: '4rem',
          padding: '2rem',
          background: 'var(--color-card-bg)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          maxWidth: 720,
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Why choose Euthenia Studio
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            {tool.whyEuthenia}
          </p>
        </div>

        <div ref={ctaRef} className="reveal reveal-delay-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <GoldButton href={tool.url}>
            <ExternalLink size={16} />
            Open {tool.name}
          </GoldButton>
          <button
            onClick={() => onNavigate('studio-pass')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 2rem', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-glass)', color: 'var(--color-text-primary)',
              fontWeight: 600, fontSize: '1rem', cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all var(--transition-normal)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.background = 'rgba(251, 225, 52, 0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.background = 'var(--color-glass)';
            }}
          >
            <Star size={16} />
            Get Studio Pass
          </button>
        </div>
      </div>
    </div>
  );
}
