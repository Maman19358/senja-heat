// Procedural radio synthwave/lofi loops (Revision 2 - WebAudio synth loops)
export const STATIONS = [
  { name: 'SENJA WAVE (SYNTHWAVE)', song: 'Neon Boulevard - 110 BPM' },
  { name: 'TELUK LO-FI (CHILL)', song: 'Sunset Coffee - 85 BPM' }
];

let currentStation = 0;
let radioActive = false;
let synthTimer = null;
let audioCtx = null;

export function getActiveRadio() {
  return STATIONS[currentStation];
}

export function cycleRadio() {
  currentStation = (currentStation + 1) % STATIONS.length;
  updateRadioUI();
  playRadioChord();
}

export function updateRadioUI() {
  const el = document.getElementById('veh-radio');
  if (el) {
    const st = getActiveRadio();
    el.textContent = `RADIO: ${st.name} - ${st.song}`;
  }
}

export function initRadio() {
  if (radioActive) return;
  radioActive = true;
  updateRadioUI();
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  } catch (e) {}
  
  // Periodic ambient synth chime/arp loop
  synthTimer = setInterval(() => {
    if (!radioActive || !audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
      return;
    }
    playRadioChord();
  }, 4000);
}

function playRadioChord() {
  if (!audioCtx) return;
  try {
    const notes = currentStation === 0 ? [220, 277, 330, 440] : [196, 247, 294, 392];
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = currentStation === 0 ? 'square' : 'sine';
    const note = notes[Math.floor(Math.random() * notes.length)];
    osc.frequency.setValueAtTime(note, now);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 1.3);
  } catch (e) {}
}

