import { ExternalLink } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useScrollReveal<HTMLDivElement>();
  const Icon = project.icon;

  return (
    <div
      ref={ref}
      className={`reveal ${index % 2 === 0 ? 'reveal-delay-1' : 'reveal-delay-2'}`}
      style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
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
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 'var(--radius-md)',
          background: 'rgba(251, 225, 52, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          color: 'var(--color-accent)',
        }}
      >
        <Icon size={20} />
      </div>

      <h3
        style={{
          fontSize: '1.125rem',
          fontWeight: 700,
          marginBottom: '0.375rem',
          letterSpacing: '-0.02em',
        }}
      >
        {project.name}
      </h3>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
          marginBottom: '1.25rem',
        }}
      >
        {project.description}
      </p>

      <a
        data-sound="click"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.375rem',
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: 'var(--color-accent)',
          transition: 'gap var(--transition-fast)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.gap = '0.625rem';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.gap = '0.375rem';
        }}
      >
        Open Website
        <ExternalLink size={14} />
      </a>
    </div>
  );
}
