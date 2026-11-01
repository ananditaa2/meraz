// Web Audio API Synthesizer for authentic retro Windows 98 sound effects & Winamp player
let audioCtx = null;
let isMuted = false;

// Winamp track playback state
let currentSourceNodes = [];
let musicTimer = null;
let isMusicPlaying = false;
let currentTrackId = null;
let analyserNode = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuted(muted) {
  isMuted = muted;
  if (isMuted && isMusicPlaying) {
    stopMusic();
  }
}

export function getMuted() {
  return isMuted;
}

export function toggleMute() {
  isMuted = !isMuted;
  if (isMuted && isMusicPlaying) {
    stopMusic();
  }
  return isMuted;
}

// Gentle mouse click
export function playClickSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    console.debug('Audio error', e);
  }
}

// Windows Ding / Chord
export function playDingSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [659.25, 830.61, 987.77];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.12 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.85);
    });
  } catch (e) {
    console.debug('Audio error', e);
  }
}

// Windows Error / Critical Stop
export function playErrorSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [150, 220];
    freqs.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    });
  } catch (e) {
    console.debug('Audio error', e);
  }
}

// Windows 98 Startup chime
export function playStartupSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [
      { f: 392.00, t: 0.0, d: 0.8 },
      { f: 523.25, t: 0.2, d: 1.0 },
      { f: 659.25, t: 0.4, d: 1.2 },
      { f: 783.99, t: 0.6, d: 1.5 },
      { f: 1046.50, t: 0.8, d: 2.0 },
      { f: 523.25, t: 0.8, d: 2.2 },
    ];

    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + t);
      gain.gain.setValueAtTime(0, now + t);
      gain.gain.linearRampToValueAtTime(0.08, now + t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + d + 0.1);
    });
  } catch (e) {
    console.debug('Audio error', e);
  }
}

// Victory / Unlock Fanfare
export function playSuccessFanfare() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const fanfare = [
      { f: 523.25, t: 0.00, d: 0.25 },
      { f: 659.25, t: 0.18, d: 0.25 },
      { f: 783.99, t: 0.36, d: 0.35 },
      { f: 1046.50, t: 0.58, d: 1.2 },
      { f: 1318.51, t: 0.60, d: 1.2 },
    ];

    fanfare.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + t);
      gain.gain.setValueAtTime(0.12, now + t);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + d + 0.1);
    });
  } catch (e) {
    console.debug('Audio error', e);
  }
}

// Clue discovered chime
export function playClueSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [587.33, 880.00].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      gain.gain.setValueAtTime(0.1, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.55);
    });
  } catch (e) {
    console.debug('Audio error', e);
  }
}

// Authentic ICQ "Uh-Oh!" Notification Chime
export function playICQUhOhSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // First syllable "Uh"
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(620, now);
    osc1.frequency.exponentialRampToValueAtTime(560, now + 0.15);
    gain1.gain.setValueAtTime(0.14, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.16);

    // Second syllable "-Oh!" (dropping playfully)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(780, now + 0.18);
    osc2.frequency.exponentialRampToValueAtTime(440, now + 0.42);
    gain2.gain.setValueAtTime(0.16, now + 0.18);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.18);
    osc2.stop(now + 0.46);
  } catch (e) {
    console.debug('ICQ audio error', e);
  }
}

// ---------------------------------------------------------------------
// WINAMP AUDIO SYNTHESIZER ENGINE (Lo-Fi Track + Mysterious Voice Memo)
// ---------------------------------------------------------------------

function setupAnalyser(ctx) {
  if (!analyserNode) {
    analyserNode = ctx.createAnalyser();
    analyserNode.fftSize = 64;
  }
  return analyserNode;
}

export function stopMusic() {
  isMusicPlaying = false;
  currentTrackId = null;
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
  currentSourceNodes.forEach((node) => {
    try {
      node.stop();
      node.disconnect();
    } catch {}
  });
  currentSourceNodes = [];
}

export function isTrackPlaying(trackId) {
  return isMusicPlaying && currentTrackId === trackId;
}

export function playWinampTrack(trackId) {
  stopMusic();
  if (isMuted) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  isMusicPlaying = true;
  currentTrackId = trackId;
  const analyser = setupAnalyser(ctx);

  if (trackId === 'lofi') {
    // 90s Synthwave Lo-Fi Arpeggiator (C minor -> Ab -> Bb -> G)
    const chords = [
      [261.63, 311.13, 392.00, 523.25], // Cm
      [207.65, 261.63, 311.13, 415.30], // Ab
      [233.08, 293.66, 349.23, 466.16], // Bb
      [196.00, 246.94, 293.66, 392.00]  // G
    ];
    let chordIdx = 0;
    let step = 0;

    const playStep = () => {
      if (!isMusicPlaying) return;
      const now = ctx.currentTime;
      const currentChord = chords[chordIdx];
      const noteFreq = currentChord[step % 4];

      // Synth Lead
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(noteFreq, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(analyser);
      analyser.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);

      // Bass note on first step
      if (step === 0) {
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(currentChord[0] / 2, now);
        bassGain.gain.setValueAtTime(0.07, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        bassOsc.connect(bassGain);
        bassGain.connect(analyser);
        bassOsc.start(now);
        bassOsc.stop(now + 0.85);
      }

      step = (step + 1) % 4;
      if (step === 0) {
        chordIdx = (chordIdx + 1) % chords.length;
      }
    };

    musicTimer = setInterval(playStep, 240);
  } else if (trackId === 'voicemail') {
    // Atmospheric October 31, 1998 Audio Cassette Log
    let timeTick = 0;
    const playTapeStatic = () => {
      if (!isMusicPlaying) return;
      const now = ctx.currentTime;

      // Radio tone beep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const freqs = [440, 880, 520, 660];
      osc.frequency.setValueAtTime(freqs[timeTick % freqs.length], now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc.connect(gain);
      gain.connect(analyser);
      analyser.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);

      timeTick++;
    };

    musicTimer = setInterval(playTapeStatic, 450);
  }
}

export function getVisualizerLevels() {
  if (!analyserNode || !isMusicPlaying) {
    return [2, 4, 3, 5, 2, 6, 3, 2];
  }
  const data = new Uint8Array(analyserNode.frequencyBinCount);
  analyserNode.getByteFrequencyData(data);
  const bars = [];
  const step = Math.floor(data.length / 8);
  for (let i = 0; i < 8; i++) {
    const val = data[i * step] || 0;
    bars.push(Math.max(2, Math.min(10, Math.floor(val / 25))));
  }
  return bars;
}
