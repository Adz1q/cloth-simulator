import { Link } from '../core/link';
import { CONFIG } from '../config';

export class CanvasRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    // Non-null assertion is safe here as we're creating the element freshly
    this.ctx = this.canvas.getContext('2d')!;

    this.canvas.width = CONFIG.CANVAS_WIDTH;
    this.canvas.height = CONFIG.CANVAS_HEIGHT;

    this.canvas.style.display = 'block';
    this.canvas.style.backgroundColor = '#ffffff';

    document.body.appendChild(this.canvas);
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  getDimensions(): { width: number; height: number } {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    };
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Renders the cloth mesh.
   * Optimizes performance by batching all link segments into a single path stroke.
   */
  drawLinks(links: Link[]): void {
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();

    for (let i = 0, len = links.length; i < len; i++) {
      const link = links[i];
      this.ctx.moveTo(link.pointA.x, link.pointA.y);
      this.ctx.lineTo(link.pointB.x, link.pointB.y);
    }

    this.ctx.stroke();
  }

  drawFPS(fps: number): void {
    this.ctx.fillStyle = '#333333';
    this.ctx.font = '12px monospace';
    this.ctx.fillText(`FPS: ${Math.round(fps)}`, 20, 20);
    this.ctx.fillText(`Entities: ~${CONFIG.QUALITY ** 2}`, 20, 35);
  }
}
