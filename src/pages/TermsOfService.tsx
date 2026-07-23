import { usePageMeta } from '../hooks/usePageMeta';

export function TermsOfService({ onNavigate }: { onNavigate: (page: string) => void }) {
  usePageMeta(
    'Terms of Service - Euthenia Studio',
    'Terms of service for Euthenia Studio. Free tools are provided as-is. Studio Pass purchases are final. No refunds.',
  );

  return (
    <main style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <a
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          href="#home"
          style={{ color: 'var(--color-accent)', fontSize: '0.875rem', cursor: 'pointer', display: 'inline-block', marginBottom: '2rem' }}
        >
          &larr; Back to Home
        </a>

        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)', marginBottom: '2.5rem' }}>
          Last updated: July 24, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Section title="Acceptance of Terms">
            By using any Euthenia Studio tool or website, you agree to these Terms of Service.
            If you do not agree, do not use the services.
          </Section>

          <Section title="Description of Service">
            Euthenia Studio provides free online tools that run in your browser. A paid Studio Pass
            unlocks additional features. All tools are provided "as is" without any warranty.
          </Section>

          <Section title="Intellectual Property">
            All tools, code, designs, and content on Euthenia Studio websites are the intellectual
            property of Teddz (Euthenia Studio) unless otherwise stated. You may not copy,
            modify, distribute, sell, or reverse engineer any part of the software without
            explicit permission.
          </Section>

          <Section title="License Keys">
            Studio Pass license keys are for personal use only. One license key may be activated
            on multiple devices owned by the same person. Sharing, reselling, or distributing
            license keys is prohibited and will result in revocation of the license.
          </Section>

          <Section title="Payments and Refunds">
            Studio Pass is a one-time purchase. Due to the nature of digital products, all
            sales are final. No refunds will be issued. If you experience technical issues
            with activation, contact teddzfr@proton.me for assistance.
          </Section>

          <Section title="Limitation of Liability">
            Euthenia Studio and its creator shall not be liable for any damages arising from
            the use or inability to use the tools or services. The tools are provided free of
            charge and without guarantees of availability, accuracy, or reliability.
          </Section>

          <Section title="Changes to Terms">
            These terms may be updated at any time. Continued use of the services after changes
            constitutes acceptance of the new terms.
          </Section>

          <Section title="Governing Law">
            These terms are governed by the laws of the Republic of Poland.
          </Section>

          <Section title="Contact">
            For questions about these terms, email{' '}
            <a href="mailto:teddzfr@proton.me" style={{ color: 'var(--color-accent)' }}>teddzfr@proton.me</a>.
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>{title}</h2>
      <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>{children}</p>
    </div>
  );
}
