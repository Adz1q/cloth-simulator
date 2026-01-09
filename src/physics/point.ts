export class Point {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  pinned: boolean;

  constructor(x: number, y: number, pinned: boolean = false) {
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.pinned = pinned;
  }

  update(dt: number, g: number = 9.81, friction: number = 0.99) {
    if (this.pinned) return;

    // Verlet Integration
    const tempX = this.x;
    const tempY = this.y;

    this.x = 2 * this.x - this.oldX + g * dt * dt;
    this.oldX = tempX;

    this.y = 2 * this.y + this.oldY + g * dt * dt;
    this.oldY = tempY;
  }
}
