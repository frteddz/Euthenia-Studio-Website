let ctx: AudioContext | null = null;
let ambientGain: GainNode | null = null;
let ambientPlaying = false;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function playClick() {
  const c = getCtx();
  const t = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(900, t);
  osc.frequency.exponentialRampToValueAtTime(600, t + 0.04);
  gain.gain.setValueAtTime(0.08, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  osc.start(t);
  osc.stop(t + 0.04);
}

export function playHover() {
  const c = getCtx();
  const t = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(c.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, t);
  osc.frequency.exponentialRampToValueAtTime(800, t + 0.02);
  gain.gain.setValueAtTime(0.02, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
  osc.start(t);
  osc.stop(t + 0.02);
}

export function startAmbient() {
  if (ambientPlaying) return;
  const c = getCtx();
  const t = c.currentTime;

  ambientGain = c.createGain();
  ambientGain.gain.setValueAtTime(0, t);
  ambientGain.gain.linearRampToValueAtTime(0.015, t + 2);
  ambientGain.connect(c.destination);

  const osc1 = c.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(48, t);
  osc1.connect(ambientGain);
  osc1.start(t);

  const osc2 = c.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(52, t);
  osc2.connect(ambientGain);
  osc2.start(t);

  const bufferSize = c.sampleRate * 4;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.02;
  }
  const noise = c.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  const noiseGain = c.createGain();
  noiseGain.gain.setValueAtTime(0.006, t);
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(200, t);
  noise.connect(noiseGain);
  noiseGain.connect(filter);
  filter.connect(ambientGain);
  noise.start(t);

  ambientPlaying = true;
}

export function stopAmbient() {
  if (!ambientPlaying || !ambientGain) return;
  const t = getCtx().currentTime;
  ambientGain.gain.linearRampToValueAtTime(0, t + 1);
  setTimeout(() => {
    ambientPlaying = false;
  }, 1000);
}

export function isAmbientPlaying() {
  return ambientPlaying;
}
