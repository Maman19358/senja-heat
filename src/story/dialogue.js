// Dialogue manager UI controller and briefing queue
import { drawPortrait, CAST } from './cast.js';

let dialogueQueue = [];
let isDialogueActive = false;
let activeCallback = null;
let autoCloseTimer = null;

export function showDialogue(speakerKey, speakerName, text, onComplete) {
  const box = document.getElementById('dialogue-box');
  const portrait = document.getElementById('dialogue-portrait');
  const nameEl = document.getElementById('dialogue-speaker');
  const textEl = document.getElementById('dialogue-text');

  if (!box) {
    if (onComplete) onComplete();
    return;
  }

  const charInfo = CAST[speakerKey] || { color: '#ffd166', name: speakerName };
  const displayName = speakerName || charInfo.name || 'UNKNOWN';

  if (portrait && portrait.tagName === 'CANVAS') {
    drawPortrait(portrait, speakerKey);
  }

  if (nameEl) nameEl.textContent = displayName;
  if (textEl) textEl.textContent = text;
  box.style.display = 'flex';
  isDialogueActive = true;
  activeCallback = onComplete;

  if (autoCloseTimer) clearTimeout(autoCloseTimer);
  autoCloseTimer = setTimeout(() => {
    advanceDialogue();
  }, 4500);
}

export function queueDialogue(speakerKey, speakerName, text, onComplete) {
  dialogueQueue.push({ speakerKey, speakerName, text, onComplete });
  if (!isDialogueActive) {
    processNextDialogue();
  }
}

function processNextDialogue() {
  if (dialogueQueue.length === 0) {
    isDialogueActive = false;
    const box = document.getElementById('dialogue-box');
    if (box) box.style.display = 'none';
    return;
  }

  const next = dialogueQueue.shift();
  showDialogue(next.speakerKey, next.speakerName, next.text, () => {
    if (next.onComplete) next.onComplete();
    processNextDialogue();
  });
}

export function advanceDialogue() {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = null;
  }
  const box = document.getElementById('dialogue-box');
  if (box) box.style.display = 'none';
  isDialogueActive = false;

  if (activeCallback) {
    const cb = activeCallback;
    activeCallback = null;
    cb();
  } else if (dialogueQueue.length > 0) {
    processNextDialogue();
  }
}

export function initDialogueSystem() {
  const box = document.getElementById('dialogue-box');
  if (box) {
    box.addEventListener('click', () => {
      advanceDialogue();
    });
  }
}
