import { PointMass } from './point-mass';
import { REST_DIST, TEAR_DIST } from '../config';
import { distanceSq } from '../math/utils';

export class Link {
  readonly pointA: PointMass;
  readonly pointB: PointMass;

  constructor(pointA: PointMass, pointB: PointMass) {
    this.pointA = pointA;
    this.pointB = pointB;
  }

  /**
   * Relaxes the constraint to satisfy the resting distance.
   * @returns false if the link snaps (tears), true otherwise.
   */
  solve(): boolean {
    const currentDistSq = distanceSq(
      this.pointA.x, this.pointA.y,
      this.pointB.x, this.pointB.y
    );

    // Fast fail: Tear check using squared threshold
    if (currentDistSq > TEAR_DIST * TEAR_DIST) {
      return false;
    }

    // Performance optimization: 
    // Only calculate sqrt if the spring is potentially active (stretched).
    // REST_DIST squared check avoids expensive sqrt in stable/compressed state.
    if (currentDistSq > REST_DIST * REST_DIST) {
      const dist = Math.sqrt(currentDistSq);
      
      // Calculate scalar correction (Spring force approximation)
      const diff = (REST_DIST - dist) / dist;
      
      const dx = this.pointB.x - this.pointA.x;
      const dy = this.pointB.y - this.pointA.y;
      
      // Split the correction equally between two masses (0.5 each)
      const correctionX = dx * 0.5 * diff;
      const correctionY = dy * 0.5 * diff;

      if (!this.pointA.pinned) {
        this.pointA.x -= correctionX;
        this.pointA.y -= correctionY;
      }
      if (!this.pointB.pinned) {
        this.pointB.x += correctionX;
        this.pointB.y += correctionY;
      }
    }

    return true;
  }

  /**
   * Checks if a point interacts with the link's midpoint (for cutting).
   */
  isNear(px: number, py: number, radius: number): boolean {
    const midX = (this.pointA.x + this.pointB.x) * 0.5;
    const midY = (this.pointA.y + this.pointB.y) * 0.5;
    
    // Compare squared distances to avoid sqrt
    return distanceSq(px, py, midX, midY) < radius * radius;
  }
}
