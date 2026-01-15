import { CONFIG } from '../config';
import { clamp } from '../math/utils';

export class PointMass {
  x: number;
  y: number;
  lastX: number;
  lastY: number;

  private dx = 0;
  private dy = 0;

  pinned = false;
  private storedX: number;
  private storedY: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.storedX = x;
    this.storedY = y;
  }

  pin(): void {
    this.pinned = true;
  }

  unpin(): void {
    this.pinned = false;
  }

  /**
   * Advances simulation step using Verlet integration.
   * Handles interaction forces and boundary constraints.
   */
  update(
    dt: number,
    virtualMouseX: number,
    virtualMouseY: number,
    forceDx: number,
    forceDy: number,
    isMouseDown: boolean,
    boundaryWidth: number,
    boundaryHeight: number,
  ): void {
    if (this.pinned) {
      this.x = this.storedX;
      this.y = this.storedY;
      return;
    }

    // --- Interaction Solver ---
    let appliedForceX = 0;
    let appliedForceY = 0;

    if (isMouseDown) {
      const dx = this.x - virtualMouseX;
      const dy = this.y - virtualMouseY;
      // Optimization: Compare squared distances
      const distSq = dx * dx + dy * dy;

      if (distSq < CONFIG.INTERACT_DIST ** 2) {
        appliedForceX = forceDx;
        appliedForceY = forceDy;
      }
    }

    // --- Verlet Integration ---
    const mouseScale = CONFIG.MOUSE_STRENGTH / 100;
    
    this.dx = (this.x - this.lastX) * CONFIG.DAMPING + mouseScale * appliedForceX;
    this.dy = (this.y - this.lastY) * CONFIG.DAMPING + mouseScale * appliedForceY;

    this.lastX = this.x;
    this.lastY = this.y;

    // Apply forces (Velocity + Gravity)
    this.x += this.dx + CONFIG.GRAVITY[0] * dt;
    this.y += this.dy + CONFIG.GRAVITY[1] * dt;

    // Boundary constraints
    this.x = clamp(this.x, 0, boundaryWidth);
    this.y = clamp(this.y, 0, boundaryHeight);
  }
}
