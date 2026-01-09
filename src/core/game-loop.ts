const FPS = 60;
const FRAME_INTERVAL_MS = 1000 / FPS;
let previousTimeMs = 0;

export function update() {
  requestAnimationFrame((currentTimeMs) => {
    const deltaTimeMs = currentTimeMs - previousTimeMs;

    if (deltaTimeMs >= FRAME_INTERVAL_MS) {
      // updatePhysics();
      previousTimeMs = currentTimeMs - (deltaTimeMs % FRAME_INTERVAL_MS);
    }

    // draw();
    update();
  });
}
