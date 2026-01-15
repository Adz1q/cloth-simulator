import { PointMass } from '../core/point-mass';
import { Link } from '../core/link';
import { CONFIG, REST_DIST } from '../config';

export interface ClothData {
  points: PointMass[];
  links: Link[];
}

/**
 * Generates a 2D grid mesh of particles connected by constraints.
 * Positions are calculated to center the mesh horizontally within the viewport.
 */
export function generateCloth(
  width: number,
  height: number,
  canvasWidth: number,
): ClothData {
  const points: PointMass[] = [];
  const links: Link[] = [];

  // Center alignment offset
  const startX = canvasWidth / 2 - (width * REST_DIST) / 2;
  const startY = 20; // Padding from top

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = startX + x * REST_DIST;
      const py = startY + y * REST_DIST;

      const point = new PointMass(px, py);

      // Pin the entire top row to act as the curtain rod
      if (y === 0) {
        point.pin();
      }

      // Link to left neighbor
      if (x > 0) {
        links.push(new Link(point, points[points.length - 1]));
      }

      // Link to top neighbor
      if (y > 0) {
        links.push(new Link(point, points[points.length - width]));
      }

      points.push(point);
    }
  }

  return { points, links };
}

export function resetCloth(canvasWidth: number): ClothData {
  return generateCloth(CONFIG.QUALITY, CONFIG.QUALITY, canvasWidth);
}
