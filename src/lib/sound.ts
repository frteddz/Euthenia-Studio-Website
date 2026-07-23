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
  ambientGain.gain.linearRampToValueAtTime(0.025, t + 4);
  ambientGain.connect(c.destination);

  const subGain = c.createGain();
  subGain.gain.setValueAtTime(0.008, t);
  subGain.connect(ambientGain);

  const sub = c.createOscillator();
  sub.type = 'sine';
  sub.frequency.setValueAtTime(32, t);
  const subLfo = c.createOscillator();
  subLfo.type = 'sine';
  subLfo.frequency.setValueAtTime(0.08, t);
  const subLfoGain = c.createGain();
  subLfoGain.gain.setValueAtTime(2, t);
  subLfo.connect(subLfoGain);
  subLfoGain.connect(sub.frequency);
  sub.connect(subGain);
  sub.start(t);
  subLfo.start(t);

  const padGain = c.createGain();
  padGain.gain.setValueAtTime(0.006, t);
  padGain.connect(ambientGain);

  const pad1 = c.createOscillator();
  pad1.type = 'triangle';
  pad1.frequency.setValueAtTime(55, t);
  pad1.connect(padGain);
  pad1.start(t);

  const pad2 = c.createOscillator();
  pad2.type = 'triangle';
  pad2.frequency.setValueAtTime(55.5, t);
  pad2.connect(padGain);
  pad2.start(t);

  const pad3 = c.createOscillator();
  pad3.type = 'triangle';
  pad3.frequency.setValueAtTime(54.6, t);
  pad3.connect(padGain);
  pad3.start(t);

  const bufferSize = c.sampleRate * 4;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.02;
  }
  const noise = c.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;

  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(400, t);
  filter.Q.setValueAtTime(0.5, t);
  const filterLfo = c.createOscillator();
  filterLfo.type = 'sine';
  filterLfo.frequency.setValueAtTime(0.05, t);
  const filterLfoGain = c.createGain();
  filterLfoGain.gain.setValueAtTime(200, t);
  filterLfo.connect(filterLfoGain);
  filterLfoGain.connect(filter.frequency);
  filterLfo.start(t);

  const noiseGain = c.createGain();
  noiseGain.gain.setValueAtTime(0.01, t);
  noise.connect(noiseGain);
  noiseGain.connect(filter);
  filter.connect(ambientGain);
  noise.start(t);

  const hissBufferSize = c.sampleRate * 2;
  const hissBuffer = c.createBuffer(1, hissBufferSize, c.sampleRate);
  const hissData = hissBuffer.getChannelData(0);
  for (let i = 0; i < hissBufferSize; i++) {
    hissData[i] = (Math.random() * 2 - 1) * 0.005;
  }
  const hiss = c.createBufferSource();
  hiss.buffer = hissBuffer;
  hiss.loop = true;
  const hissFilter = c.createBiquadFilter();
  hissFilter.type = 'highpass';
  hissFilter.frequency.setValueAtTime(3000, t);
  const hissGain = c.createGain();
  hissGain.gain.setValueAtTime(0.003, t);
  hiss.connect(hissGain);
  hissGain.connect(hissFilter);
  hissFilter.connect(ambientGain);
  hiss.start(t);

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
