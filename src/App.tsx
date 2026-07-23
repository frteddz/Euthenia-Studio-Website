import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AnimatedBackground } from './components/AnimatedBackground';
import { StudioPass } from './pages/StudioPass';
import { ToolDetail } from './pages/ToolDetail';
import { BlogList } from './pages/BlogList';
import { BlogPost } from './pages/BlogPost';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { AmbientYouTube } from './components/AmbientYouTube';
import { playClick } from './lib/sound';

const Projects = lazy(() =>
  import('./components/Projects').then((m) => ({ default: m.Projects }))
);
const About = lazy(() =>
  import('./components/About').then((m) => ({ default: m.About }))
);
const Credits = lazy(() =>
  import('./components/Credits').then((m) => ({ default: m.Credits }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);

function SectionFallback() {
  return (
    <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-tertiary)', fontSize: '0.875rem' }}>
      Loading...
    </div>
  );
}

const toolIds = ['pngforge', 'pdfmerge', 'clipvault', 'quickrename', 'pixelshrink', 'folderscope', 'colorsnap', 'qrflow', 'studyflow', 'backupbuddy'];

function getPageFromHash(): string {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'studio-pass') return 'studio-pass';
  if (hash === 'blog') return 'blog';
  if (hash.startsWith('blog/')) return hash;
  if (hash === 'privacy') return 'privacy';
  if (hash === 'terms') return 'terms';
  if (toolIds.includes(hash)) return hash;
  return 'home';
}

export default function App() {
  const [page, setPage] = useState<string>(() => getPageFromHash());

  useEffect(() => {
    const handler = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-sound], a, button');
      if (!el) return;
      if (el.getAttribute('data-sound') === 'off') return;
      playClick();
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const navigate = (p: string) => {
    if (p === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = '#' + p;
    }
    setPage(p);
  };

  const renderPage = () => {
    if (page === 'studio-pass') {
      return <StudioPass />;
    }
    if (page === 'blog') {
      return <BlogList onNavigate={navigate} />;
    }
    if (page.startsWith('blog/')) {
      const postId = page.slice(5);
      return <BlogPost postId={postId} onNavigate={navigate} />;
    }
    if (page === 'privacy') {
      return <PrivacyPolicy onNavigate={navigate} />;
    }
    if (page === 'terms') {
      return <TermsOfService onNavigate={navigate} />;
    }
    if (toolIds.includes(page)) {
      return <ToolDetail toolId={page} onNavigate={navigate} />;
    }
    return (
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Credits />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </main>
    );
  };

  return (
    <>
      <AnimatedBackground />
      <AmbientYouTube />
      <Navbar currentPage={page} onNavigate={navigate} />
      {renderPage()}
    </>
  );
}
