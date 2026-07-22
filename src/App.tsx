import { useState, lazy, Suspense } from 'react';
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
    <div
      style={{
        height: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-text-tertiary)',
        fontSize: '0.875rem',
      }}
    >
      Loading...
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<'home' | 'studio-pass'>('home');

  return (
    <>
      <AnimatedBackground />
      <Navbar currentPage={page} onNavigate={setPage} />
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
