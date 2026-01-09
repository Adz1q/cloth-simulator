import type { Point } from './point';

export class Stick {
  p1: Point;
  p2: Point;
  length: number;

  constructor(p1: Point, p2: Point, length: number = 100) {
    this.p1 = p1;
    this.p2 = p2;
    this.length = length;
  }
}
