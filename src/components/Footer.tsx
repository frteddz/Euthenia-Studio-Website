import { GitBranch, ExternalLink, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid var(--color-border)',
        padding: '3rem 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '2rem',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: '0.5rem',
                }}
              >
                <span style={{ color: 'var(--color-accent)' }}>E</span>uthenia Studio
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-tertiary)',
                  maxWidth: 320,
                  lineHeight: 1.6,
                }}
              >
                A one-person software studio. Built by Teddz.
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                alignItems: 'flex-start',
              }}
            >
              <a
                href="https://github.com/frteddz"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  transition: 'color var(--transition-fast)',
                }}
              >
                <GitBranch size={16} />
                GitHub
              </a>
              <a
                href="https://x.com/teddzfr"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  transition: 'color var(--transition-fast)',
                }}
              >
                <ExternalLink size={16} />
                X / Twitter
              </a>
              <a
                href="mailto:teddzfr@proton.me"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--color-text-secondary)',
                  transition: 'color var(--transition-fast)',
                }}
              >
                <Mail size={16} />
                Contact
              </a>
            </div>
          </div>

          <div
            style={{
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--color-border)',
              fontSize: '0.8125rem',
              color: 'var(--color-text-tertiary)',
            }}
          >
            &copy; {new Date().getFullYear()} Euthenia Studio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
