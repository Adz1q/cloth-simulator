export class Mouse {
  x?: number;
  y?: number;
  lastX?: number;
  lastY?: number;

  down = false;
  rightDown = false;

  private bounds = { left: 0, top: 0 };

  constructor(canvas: HTMLCanvasElement) {
    this.updateBounds(canvas);
    this.attachListeners(canvas);
  }

  private updateBounds(canvas: HTMLCanvasElement): void {
    const rect = canvas.getBoundingClientRect();
    this.bounds.left = rect.left;
    this.bounds.top = rect.top;
  }

  private attachListeners(canvas: HTMLCanvasElement): void {
    // Re-calculate bounds on window resize/scroll to ensure accuracy
    window.addEventListener('resize', () => this.updateBounds(canvas));
    window.addEventListener('scroll', () => this.updateBounds(canvas));

    canvas.addEventListener('mousemove', (e) => {
      this.lastX = this.x;
      this.lastY = this.y;
      
      // Fast lookup using cached bounds
      this.x = e.clientX - this.bounds.left;
      this.y = e.clientY - this.bounds.top;
    });

    canvas.addEventListener('mousedown', (e) => {
      if (e.button === 0) this.down = true;
      if (e.button === 2) this.rightDown = true;
    });

    canvas.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.down = false;
      if (e.button === 2) this.rightDown = false;
    });

    canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    canvas.addEventListener('mouseleave', () => {
      this.down = false;
      this.rightDown = false;
    });
  }

  hasPosition(): boolean {
    return this.x !== undefined && this.y !== undefined;
  }

  reset(): void {
    this.x = undefined;
    this.y = undefined;
    this.lastX = undefined;
    this.lastY = undefined;
    this.down = false;
    this.rightDown = false;
  }
}
