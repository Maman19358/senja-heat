// Input manager (Keyboard + Mouse) (Revision 5 - Polished)
const keys = {};
const mouse = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  leftDown: false,
  rightDown: false,
  locked: false
};

export function initInput(domElement) {
  window.addEventListener('keydown', (e) => {
    keys[e.code.toLowerCase()] = true;
    keys[e.key.toLowerCase()] = true;
  });

  window.addEventListener('keyup', (e) => {
    keys[e.code.toLowerCase()] = false;
    keys[e.key.toLowerCase()] = false;
  });

  if (domElement) {
    domElement.addEventListener('mousemove', (e) => {
      if (mouse.locked) {
        mouse.dx += e.movementX || e.clientX - mouse.x;
        mouse.dy += e.movementY || e.clientY - mouse.y;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    domElement.addEventListener('mousedown', (e) => {
      if (e.button === 0) mouse.leftDown = true;
      if (e.button === 2) mouse.rightDown = true;
    });

    domElement.addEventListener('mouseup', (e) => {
      if (e.button === 0) mouse.leftDown = false;
      if (e.button === 2) mouse.rightDown = false;
    });

    domElement.addEventListener('click', () => {
      if (!mouse.locked && domElement.requestPointerLock) {
        domElement.requestPointerLock();
      }
    });
  }

  document.addEventListener('pointerlockchange', () => {
    mouse.locked = document.pointerLockElement === domElement;
  });
}

export function isKeyPressed(code) {
  if (!code) return false;
  return !!keys[code.toLowerCase()];
}

export function getMouseDelta() {
  const dx = mouse.dx;
  const dy = mouse.dy;
  mouse.dx = 0;
  mouse.dy = 0;
  return { dx, dy };
}

export function isMouseDown() {
  return mouse.leftDown;
}

export function isMouseLocked() {
  return mouse.locked;
}

export function getMousePosition() {
  return { x: mouse.x, y: mouse.y };
}
