// Procedural engine hum audio using WebAudio (Revision 2 - Enhanced modulation)
let audioCtx = null;
let engineOsc = null;
let engineGain = null;
let isAudioInitialized = false;

export function initEngineAudio() {
  if (isAudioInitialized) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    audioCtx = new AudioContext();

    engineOsc = audioCtx.createOscillator();
    engineOsc.type = 'sawtooth';
    engineOsc.frequency.setValueAtTime(60, audioCtx.currentTime);

    engineGain = audioCtx.createGain();
    engineGain.gain.setValueAtTime(0.0, audioCtx.currentTime);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);

    engineOsc.connect(filter);
    filter.connect(engineGain);
    engineGain.connect(audioCtx.destination);
    engineOsc.start();
    isAudioInitialized = true;
  } catch (e) {
    // AudioContext requires user gesture
  }
}

export function updateEngineAudio(speed, isDriving) {
  if (!audioCtx) {
    initEngineAudio();
    return;
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  if (engineOsc && engineGain) {
    const targetFreq = 50 + Math.min(Math.abs(speed) * 4.0, 350);
    engineOsc.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.04);
    const targetGain = isDriving ? 0.07 : 0.005;
    engineGain.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.08);
  }
}
