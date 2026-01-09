import type { Point } from './point';
import type { Stick } from './stick';

export class Cloth {
  private static cloth: Cloth;
  points: Point[] = [];
  sticks: Stick[] = [];

  public static getInstance(): Cloth {
    if (Cloth.cloth === null || Cloth.cloth === undefined) {
      Cloth.cloth = new Cloth();
    }

    return Cloth.cloth;
  }
}
