import { usePageMeta } from '../hooks/usePageMeta';

export function PrivacyPolicy({ onNavigate }: { onNavigate: (page: string) => void }) {
  usePageMeta(
    'Privacy Policy - Euthenia Studio',
    'Privacy policy for Euthenia Studio. All tools run entirely in your browser. No data is collected, stored, or transmitted to any server.',
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
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)', marginBottom: '2.5rem' }}>
          Last updated: July 24, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Section title="Summary">
            Euthenia Studio takes your privacy seriously. All tools run entirely in your browser.
            <strong> No data is collected, stored, or transmitted to any server.</strong> Your files
            never leave your device.
          </Section>

          <Section title="What Data We Collect">
            <strong>We collect no data.</strong> Euthenia Studio does not use analytics, tracking
            scripts, cookies, or any form of data collection. There are no servers, no databases,
            and no third-party services that receive your information.
          </Section>

          <Section title="Local Storage">
            Some tools use your browser's local storage to remember preferences such as theme
            settings or your Studio Pass activation status. This data stays on your device and
            is never transmitted anywhere. You can clear it at any time through your browser settings.
          </Section>

          <Section title="Studio Pass License Key">
            When you activate a Studio Pass license key, the key and your email are stored locally
            in your browser to verify your activation. This information is not sent to any external
            server.
          </Section>

          <Section title="Payment Processing">
            Payments for Studio Pass are processed through Wise. When you send a payment, we
            receive the email address you include in the payment reference. This email is used
            solely to send you your license key and is not used for marketing or shared with
            third parties.
          </Section>

          <Section title="Third-Party Services">
            Euthenia Studio websites are hosted on GitHub Pages. GitHub may collect standard
            server logs (IP address, browser type, pages visited) as part of their hosting service.
            Please refer to GitHub's Privacy Policy for more information. We do not have access
            to or control over this data.
          </Section>

          <Section title="Changes to This Policy">
            If this privacy policy changes, the updated version will be posted here with a new
            "Last updated" date.
          </Section>

          <Section title="Contact">
            If you have questions about this privacy policy, email{' '}
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
