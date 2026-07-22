import { useState } from 'react';
import { Check, Copy, Star } from 'lucide-react';
import { LicenseStore, STUDIO_PASS_PRICE } from '@euthenia-studio/shared';

function Section({ id, children, style }: { id?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section
      id={id}
      className="section"
      style={style}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
}

function GoldButton({ children, onClick, style, href }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties; href?: string }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 2rem',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-accent)',
    color: 'var(--onyx)',
    fontWeight: 700,
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    fontFamily: 'inherit',
    transition: 'all var(--transition-normal)',
    ...style,
  } as React.CSSProperties;

  if (href) {
    return <a href={href} style={base}>{children}</a>;
  }
  return <button onClick={onClick} style={base}>{children}</button>;
}

function OutlineButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.875rem 2rem', borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-glass)', color: 'var(--color-text-primary)',
        fontWeight: 600, fontSize: '1rem', cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all var(--transition-normal)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent)';
        e.currentTarget.style.background = 'rgba(251, 225, 52, 0.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.background = 'var(--color-glass)';
      }}
    >
      {children}
    </button>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      style={{
        background: 'var(--color-accent)', color: 'var(--onyx)',
        border: 'none', borderRadius: 'var(--radius-sm)',
        padding: '0.5rem 1rem', fontSize: '0.8125rem',
        fontWeight: 600, cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
        fontFamily: 'inherit',
      }}
    >
      {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
    </button>
  );
}

export function StudioPass() {
  const [tokenInput, setTokenInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const activated = LicenseStore.isActivated();

  const handleActivate = () => {
    if (!tokenInput.trim() || !emailInput.trim()) {
      setStatus('error');
      setMessage('Please enter both your license key and email.');
      return;
    }
    const result = LicenseStore.activate(tokenInput.trim(), emailInput.trim());
    if (result.success) {
      setStatus('success');
      setMessage('Studio Pass activated! All premium features are now unlocked across all Euthenia Studio tools.');
    } else {
      setStatus('error');
      setMessage(result.error || 'Activation failed. Check your license key.');
    }
  };

  return (
    <>
      <Section
        id="studio-pass"
        style={{
          paddingTop: 'calc(var(--nav-height) + 4rem)',
          paddingBottom: '2rem',
          textAlign: 'center',
        }}
      >
        <div className="reveal visible" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem',
            borderRadius: '100px',
            background: 'rgba(251, 225, 52, 0.1)',
            border: '1px solid rgba(251, 225, 52, 0.2)',
            fontSize: '0.8125rem', fontWeight: 500,
            color: 'var(--color-accent)', marginBottom: '1.5rem',
          }}>
            <Star size={14} />
            One purchase &middot; Lifetime access
          </div>

          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            <span style={{ color: 'var(--color-accent)' }}>Euthenia</span>{' '}
            Studio Pass
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            maxWidth: 520,
            margin: '0 auto 2.5rem',
          }}>
            One purchase. Lifetime access. Every supported Euthenia Studio tool.
          </p>

          <GoldButton onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Studio Pass
          </GoldButton>
        </div>
      </Section>

      <Section id="pricing" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Pricing</span>
          <h2 className="section-title">Simple, fair pricing</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            One price. Everything included. No surprises.
          </p>
        </div>

        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          <div
            className="animate-scale-in"
            style={{
              background: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-accent)',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: 3, background: 'var(--color-accent)',
            }} />

            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.75rem',
              borderRadius: '100px',
              background: 'rgba(251, 225, 52, 0.1)',
              fontSize: '0.75rem', fontWeight: 600,
              color: 'var(--color-accent)',
              textTransform: 'uppercase', letterSpacing: '0.06em',
              marginBottom: '1rem',
            }}>
              Lifetime
            </div>

            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
              ${STUDIO_PASS_PRICE}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)', marginBottom: '1.5rem' }}>
              One-time payment &middot; No subscription
            </p>

            <ul style={{ textAlign: 'left', marginBottom: '2rem' }}>
              {[
                'Lifetime access',
                'Unlock every current Pro feature',
                'Unlock future supported tools',
                'Free future updates',
                'One purchase',
                'No subscription',
                'No monthly payments',
              ].map((item) => (
                <li key={item} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.5rem 0',
                  fontSize: '0.9375rem', color: 'var(--color-text-secondary)',
                }}>
                  <Check size={16} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>

            <GoldButton
              onClick={() => document.getElementById('how-to-pay')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Get Studio Pass
            </GoldButton>
          </div>
        </div>
      </Section>

      <Section id="comparison" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Comparison</span>
          <h2 className="section-title">Free vs Studio Pass</h2>
        </div>

        <div style={{
          maxWidth: 600, margin: '0 auto',
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            background: 'var(--color-card-bg)',
          }}>
            <div style={{ padding: '1rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}></div>
            <div style={{ padding: '1rem', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-text-primary)', textAlign: 'center', borderBottom: '1px solid var(--color-border)' }}>
              Free
            </div>
            <div style={{
              padding: '1rem', fontWeight: 700, fontSize: '0.9375rem',
              color: 'var(--color-accent)', textAlign: 'center',
              borderBottom: '1px solid var(--color-border)',
              background: 'rgba(251, 225, 52, 0.03)',
            }}>
              Studio Pass
            </div>
          </div>
          {[
            ['Features', 'Basic features', 'Everything unlocked'],
            ['Support', 'Community support', 'Priority support'],
            ['Advanced tools', 'Limited', 'All Pro tools'],
            ['Updates', 'Standard', 'Free future updates'],
            ['Payment', 'Free forever', 'Lifetime'],
          ].map(([label, free, pro], i) => (
            <div
              key={label}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                borderTop: '1px solid var(--color-border)',
                background: i % 2 === 0 ? 'transparent' : 'var(--color-card-bg)',
              }}
            >
              <div style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                {label}
              </div>
              <div style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
                {free}
              </div>
              <div style={{
                padding: '0.875rem 1rem', fontSize: '0.875rem',
                color: 'var(--color-accent)', textAlign: 'center',
                background: 'rgba(251, 225, 52, 0.03)',
              }}>
                {pro}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="how-to-pay" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-label">Payment</span>
          <h2 className="section-title">How to purchase</h2>
        </div>

        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{
            background: 'var(--color-card-bg)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--color-border)',
          }}>
            <ol style={{
              display: 'flex', flexDirection: 'column', gap: '1.25rem',
              counterReset: 'step',
            }}>
              {[
                {
                  title: 'Send $5.99 via Wise',
                  desc: 'Send the payment to the Wise email below. Include your email in the payment reference.',
                },
                {
                  title: 'Receive your license key',
                  desc: 'I will email your unique license key within 24 hours of receiving the payment.',
                },
                {
                  title: 'Activate on any tool',
                  desc: 'Enter your license key in any Euthenia Studio tool to unlock all Pro features.',
                },
              ].map((step, i) => (
                <li key={i} style={{
                  display: 'flex', gap: '1rem',
                  counterIncrement: 'step',
                }}>
                  <div style={{
                    width: 32, height: 32,
                    borderRadius: '50%',
                    background: 'rgba(251, 225, 52, 0.1)',
                    border: '1px solid rgba(251, 225, 52, 0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8125rem', fontWeight: 700,
                    color: 'var(--color-accent)',
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                      {step.title}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'var(--color-bg-primary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.125rem' }}>
                  Wise Email
                </p>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>
                  teddzfr@proton.me
                </p>
              </div>
              <CopyButton text="teddzfr@proton.me" />
            </div>
          </div>
        </div>
      </Section>

      <Section id="faq" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Common questions</h2>
        </div>

        <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { q: 'Do I pay every month?', a: 'No. Studio Pass is a one-time purchase. Pay once and you\'re set for life.' },
            { q: 'Can I use it forever?', a: 'Yes. Once activated, your Studio Pass never expires. You get lifetime access.' },
            { q: 'Will future supported tools be included?', a: 'Yes. Any new Euthenia Studio tool added in the future will also be unlocked with your Studio Pass.' },
            { q: 'Do I need to purchase every application separately?', a: 'No. One Studio Pass unlocks every supported Euthenia Studio tool. There\'s no need to buy individual licenses.' },
            { q: 'How do I get my license key?', a: 'After sending the payment via Wise, I\'ll email your unique license key within 24 hours to the email you included in the payment reference.' },
            { q: 'What if I lose my license key?', a: 'Email me at the same Wise address with your payment details. You can request one free replacement. Additional replacements may incur a small fee.' },
            { q: 'Can I use my license on multiple computers?', a: 'Yes. Your Studio Pass can be activated on any device you own. Simply enter your license key on each device.' },
          ].map((faq) => (
            <details
              key={faq.q}
              style={{
                background: 'var(--color-card-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
              }}
            >
              <summary style={{
                padding: '1rem 1.25rem',
                fontWeight: 600, fontSize: '0.9375rem',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                {faq.q}
              </summary>
              <div style={{
                padding: '0 1.25rem 1rem',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
              }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <Section id="activate" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-label">Activation</span>
          <h2 className="section-title">Activate your license</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Already have a license key? Enter it below to activate Studio Pass.
          </p>
        </div>

        <div style={{ maxWidth: 440, margin: '0 auto' }}>
          {activated ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(251, 225, 52, 0.2)',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                Studio Pass Active
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-accent)', fontWeight: 500 }}>
                All premium features unlocked
              </p>
              <div style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>
                Token: {LicenseStore.getToken()?.substring(0, 14)}...
              </div>
              <OutlineButton onClick={() => { LicenseStore.deactivate(); window.location.reload(); }}>
                Deactivate
              </OutlineButton>
            </div>
          ) : (
            <div style={{
              background: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              border: '1px solid var(--color-border)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.375rem' }}>
                    License Key
                  </label>
                  <input
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxxxx"
                    style={{
                      width: '100%', padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-primary)',
                      color: 'var(--color-text-primary)',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-mono)',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.375rem' }}>
                    Email
                  </label>
                  <input
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="your@email.com"
                    type="email"
                    style={{
                      width: '100%', padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg-primary)',
                      color: 'var(--color-text-primary)',
                      fontSize: '0.875rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {message && (
                <p style={{
                  fontSize: '0.8125rem',
                  color: status === 'success' ? '#22c55e' : '#ef4444',
                  marginBottom: '0.75rem',
                  textAlign: 'center',
                }}>
                  {message}
                </p>
              )}

              <GoldButton onClick={handleActivate} style={{ width: '100%', justifyContent: 'center' }}>
                Activate Studio Pass
              </GoldButton>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
