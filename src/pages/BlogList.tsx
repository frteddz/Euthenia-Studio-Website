import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePageMeta } from '../hooks/usePageMeta';
import { blogPosts } from '../data/blog';

interface BlogListProps {
  onNavigate: (page: string) => void;
}

export function BlogList({ onNavigate }: BlogListProps) {
  usePageMeta('Blog - Euthenia Studio', 'Read articles and guides from Euthenia Studio about image compression, PDF management, batch processing, and more.');

  const titleRef = useScrollReveal<HTMLDivElement>();
  const subtitleRef = useScrollReveal<HTMLDivElement>();

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '6rem' }}>
      <div className="container">
        <div ref={titleRef} className="reveal">
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

        <div ref={titleRef} className="reveal" style={{ marginBottom: '0.5rem' }}>
          <span className="section-label">Blog</span>
        </div>
        <div ref={subtitleRef} className="reveal reveal-delay-1" style={{ marginBottom: '3rem' }}>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Articles & Guides
          </h1>
          <p className="section-subtitle">
            Tips, tutorials, and insights from the Euthenia Studio team.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 720 }}>
          {blogPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogCard({ post, index, onNavigate }: { post: typeof blogPosts[0]; index: number; onNavigate: (page: string) => void }) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <article
      ref={ref}
      className={`reveal reveal-delay-${Math.min(index + 1, 4)}`}
      onClick={() => onNavigate(`blog/${post.id}`)}
      style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        cursor: 'pointer',
        transition: 'all var(--transition-normal)',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(251, 225, 52, 0.2)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
          <Calendar size={14} />
          {post.date}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap' }}>
          {post.tags.map((tag) => (
            <span key={tag} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
              padding: '0.125rem 0.5rem',
              borderRadius: '100px',
              background: 'rgba(251, 225, 52, 0.08)',
              fontSize: '0.75rem', fontWeight: 500,
              color: 'var(--color-accent)',
            }}>
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>
      </div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
        {post.title}
      </h2>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
        {post.excerpt}
      </p>
    </article>
  );
}
