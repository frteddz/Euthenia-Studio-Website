import { useState, useEffect, useCallback, useRef } from 'react';
import { Menu, X, Star, Volume2, VolumeX } from 'lucide-react';
import { startAmbient, stopAmbient, setVolume } from '../lib/ambient';

const links = [
  { page: 'home' as const, label: 'Home' },
  { page: 'home' as const, label: 'Projects', hash: '#projects' },
  { page: 'home' as const, label: 'About', hash: '#about' },
  { page: 'home' as const, label: 'Credits', hash: '#credits' },
];

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [ambientOn, setAmbientOn] = useState(false);
  const [volume, setVolumeState] = useState(30);
  const sliderRef = useRef<HTMLDivElement>(null);
  const toggleAmbient = useCallback(() => {
    if (ambientOn) {
      stopAmbient();
      setAmbientOn(false);
    } else {
      startAmbient('ambient-youtube');
      setAmbientOn(true);
    }
  }, [ambientOn]);
  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolumeState(v);
    setVolume(v);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--nav-height)',
        background: scrolled ? 'rgba(11, 12, 12, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'all var(--transition-normal)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          data-sound="click"
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          href="#home"
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
          }}
        >
          <span style={{ color: 'var(--color-accent)' }}>E</span>uthenia
        </a>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <div style={{ display: 'none', gap: '0.25rem' }} className="nav-desktop-links">
            {currentPage === 'home' ? (
              <>
                {links.map((link) => (
                  <a
                    data-sound="click"
                    key={link.label}
                    href={link.hash || '#home'}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'var(--color-text-secondary)',
                      transition: 'all var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                      e.currentTarget.style.background = 'var(--color-glass)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  data-sound="click"
                  onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}
                  href="#blog"
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                    e.currentTarget.style.background = 'var(--color-glass)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Blog
                </a>
              </>
            ) : (
              <a
                data-sound="click"
                onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
                href="#home"
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                  e.currentTarget.style.background = 'var(--color-glass)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Back to Home
              </a>
            )}

            {currentPage === 'home' && (
              <a
                data-sound="click"
                onClick={(e) => { e.preventDefault(); onNavigate('studio-pass'); }}
                href="#studio-pass"
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-accent)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(251, 225, 52, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Star size={14} />
                Studio Pass
              </a>
            )}
          </div>

          <div
            ref={sliderRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              marginRight: '0.25rem',
            }}
          >
            <button
              data-sound="click"
              onClick={toggleAmbient}
              title={ambientOn ? 'Disable ambient sound' : 'Enable ambient sound'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-sm)',
                color: ambientOn ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                transition: 'all var(--transition-fast)',
              }}
            >
              {ambientOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>
            {ambientOn && (
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={handleVolume}
                style={{
                  width: 64,
                  height: 4,
                  accentColor: 'var(--color-accent)',
                  cursor: 'pointer',
                }}
              />
            )}
          </div>

          <button
            data-sound="click"
            onClick={() => setOpen(!open)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary)',
              transition: 'background var(--transition-fast)',
            }}
            className="nav-mobile-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          style={{
            background: 'rgba(11, 12, 12, 0.98)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--color-border)',
            padding: '1rem 1.5rem',
          }}
        >
          {currentPage === 'home' ? (
            <>
              {links.map((link) => (
                <a
                  data-sound="click"
                  key={link.label}
                  href={link.hash || '#home'}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.75rem 0',
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                data-sound="click"
                onClick={(e) => { e.preventDefault(); onNavigate('blog'); setOpen(false); }}
                href="#blog"
                style={{
                  display: 'block',
                  padding: '0.75rem 0',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                Blog
              </a>
            </>
          ) : (
            <a
              data-sound="click"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); setOpen(false); }}
              href="#home"
              style={{
                display: 'block',
                padding: '0.75rem 0',
                fontSize: '1rem',
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
              }}
            >
              Back to Home
            </a>
          )}
          <a
            data-sound="click"
            onClick={(e) => { e.preventDefault(); onNavigate('studio-pass'); setOpen(false); }}
            href="#studio-pass"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 0',
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--color-accent)',
              borderBottom: currentPage === 'home' ? '1px solid var(--color-border)' : 'none',
            }}
          >
            <Star size={16} />
            Studio Pass
          </a>
        </div>
      )}
    </nav>
  );
}
