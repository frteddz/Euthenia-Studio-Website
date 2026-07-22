import { ArrowLeft, Calendar, Tag, User } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { usePageMeta } from '../hooks/usePageMeta';
import { blogPosts } from '../data/blog';

interface BlogPostProps {
  postId: string;
  onNavigate: (page: string) => void;
}

export function BlogPost({ postId, onNavigate }: BlogPostProps) {
  const post = blogPosts.find((p) => p.id === postId);

  const titleRef = useScrollReveal<HTMLDivElement>();
  const metaRef = useScrollReveal<HTMLDivElement>();
  const contentRef = useScrollReveal<HTMLDivElement>();

  usePageMeta(post?.metaTitle || 'Blog - Euthenia Studio', post?.metaDescription || '');

  if (!post) {
    return (
      <div style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', textAlign: 'center', padding: '8rem 1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Post not found</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>The blog post you are looking for does not exist.</p>
        <button onClick={() => onNavigate('blog')} style={{ color: 'var(--color-accent)', fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', fontSize: '1rem' }}>
          Back to Blog
        </button>
      </div>
    );
  }

  const paragraphs = post.content.split('\n').filter(Boolean);

  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '6rem' }}>
      <div className="container" style={{ maxWidth: 720, margin: '0 auto', padding: '0 1.5rem' }}>
        <div ref={titleRef} className="reveal">
          <button
            onClick={() => onNavigate('blog')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              fontSize: '0.875rem',
              color: 'var(--color-text-tertiary)',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              background: 'none',
              border: 'none',
              fontFamily: 'inherit',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-tertiary)'; }}
          >
            <ArrowLeft size={16} />
            Back to Blog
          </button>
        </div>

        <div ref={metaRef} className="reveal reveal-delay-1" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
              <Calendar size={14} />
              {post.date}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
              <User size={14} />
              {post.author}
            </div>
          </div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                padding: '0.25rem 0.625rem',
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

        <div ref={contentRef} className="reveal reveal-delay-2">
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

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
          <button
            onClick={() => onNavigate('home')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              fontSize: '0.875rem', fontWeight: 600,
              color: 'var(--color-accent)', cursor: 'pointer',
              background: 'none', border: 'none', fontFamily: 'inherit',
            }}
          >
            <ArrowLeft size={14} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
