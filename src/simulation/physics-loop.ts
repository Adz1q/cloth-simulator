import { CONFIG } from '../config';
import { PointMass } from '../core/point-mass';
import { Link } from '../core/link';
import { Mouse } from '../input/mouse';
import { CanvasRenderer } from '../renderer/canvas';
import { resetCloth } from './cloth-factory';

/**
 * Handles the main simulation lifecycle using a fixed timestep accumulator.
 * Ensures deterministic physics regardless of the display refresh rate.
 */
export class PhysicsLoop {
  private points: PointMass[] = [];
  private links: Link[] = [];
  private renderer: CanvasRenderer;
  private mouse: Mouse;

  // Timestep Accumulator
  private lastTime = performance.now();
  private accumulator = 0;

  // Decoupled Physics Input State
  // We track mouse position in simulation time to prevent input loss at high refresh rates.
  private physMouseX: number = 0;
  private physMouseY: number = 0;

  // Debug Stats
  private fpsFrames = 0;
  private fpsLastTime = performance.now();
  private fps = 60;

  constructor(renderer: CanvasRenderer, mouse: Mouse) {
    this.renderer = renderer;
    this.mouse = mouse;

    // Sync physics mouse with initial input state
    this.physMouseX = mouse.x || 0;
    this.physMouseY = mouse.y || 0;
  }

  reset(): void {
    const { width } = this.renderer.getDimensions();
    const cloth = resetCloth(width);
    this.points = cloth.points;
    this.links = cloth.links;
  }

  start(): void {
    requestAnimationFrame(this.animate);
  }

  private animate = (): void => {
    const now = performance.now();
    let frameTime = now - this.lastTime;
    this.lastTime = now;

    // "Spiral of Death" Protection:
    // Clamp frameTime to avoid freezing if the tab is backgrounded or lagging heavily.
    if (frameTime > 250) frameTime = 250;

    this.accumulator += frameTime;

    const stepMs = CONFIG.TIMESTEP;
    const dtSeconds = stepMs / 1000;
    const { width: cvsW, height: cvsH } = this.renderer.getDimensions();

    const timesteps = Math.floor(this.accumulator / stepMs);

    // Input Synchronization
    // Interpolate mouse movement across substeps to maintain consistent force application.
    const targetMouseX = this.mouse.x ?? this.physMouseX;
    const targetMouseY = this.mouse.y ?? this.physMouseY;
    
    const totalDeltaX = targetMouseX - this.physMouseX;
    const totalDeltaY = targetMouseY - this.physMouseY;

    // Avoid division by zero if physics is caught up
    const stepDeltaX = timesteps > 0 ? totalDeltaX / timesteps : 0;
    const stepDeltaY = timesteps > 0 ? totalDeltaY / timesteps : 0;

    let iterMouseX = this.physMouseX;
    let iterMouseY = this.physMouseY;

    // --- Physics Substeps ---
    if (timesteps > 0) {
      for (let i = 0; i < timesteps; i++) {
        iterMouseX += stepDeltaX;
        iterMouseY += stepDeltaY;

        // 1. Constraint Relaxation
        for (let solve = 0; solve < CONFIG.SOLVES; solve++) {
          for (let k = this.links.length - 1; k >= 0; k--) {
            if (!this.links[k].solve()) {
              this.links.splice(k, 1);
            }
          }
        }

        // 2. Integration
        for (const p of this.points) {
          p.update(
            dtSeconds,
            iterMouseX,
            iterMouseY,
            stepDeltaX,
            stepDeltaY,
            this.mouse.down,
            cvsW,
            cvsH,
          );
        }

        // 3. Topology Modification (Cutting)
        if (this.mouse.rightDown && this.mouse.hasPosition()) {
          for (let k = this.links.length - 1; k >= 0; k--) {
            if (this.links[k].isNear(iterMouseX, iterMouseY, CONFIG.CUT_RADIUS)) {
              this.links.splice(k, 1);
            }
          }
        }
      }

      this.accumulator -= timesteps * stepMs;
      
      // Update physics state to match current input
      this.physMouseX = targetMouseX;
      this.physMouseY = targetMouseY;
    }

    // --- Render ---
    this.renderer.clear();
    this.renderer.drawLinks(this.links);

    this.updateFPS(now);
    this.renderer.drawFPS(this.fps);

    requestAnimationFrame(this.animate);
  };

  private updateFPS(now: number): void {
    this.fpsFrames++;
    if (now - this.fpsLastTime >= 1000) {
      this.fps = this.fpsFrames;
      this.fpsFrames = 0;
      this.fpsLastTime = now;
    }
  }
}
