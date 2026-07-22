import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AnimatedBackground } from './components/AnimatedBackground';
import { StudioPass } from './pages/StudioPass';

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

function getPageFromHash(): 'home' | 'studio-pass' {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'studio-pass') return 'studio-pass';
  return 'home';
}

export default function App() {
  const [page, setPage] = useState<'home' | 'studio-pass'>(() => getPageFromHash());

  useEffect(() => {
    const handler = () => setPage(getPageFromHash());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = (p: 'home' | 'studio-pass') => {
    window.location.hash = p === 'studio-pass' ? '#studio-pass' : '';
    setPage(p);
  };

  return (
    <>
      <AnimatedBackground />
      <Navbar currentPage={page} onNavigate={navigate} />
      {page === 'home' ? (
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
      ) : (
        <StudioPass />
      )}
    </>
  );
}
