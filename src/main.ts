import { CanvasRenderer } from './renderer/canvas';
import { Mouse } from './input/mouse';
import { PhysicsLoop } from './simulation/physics-loop';
import './style.css';

class Application {
  private renderer: CanvasRenderer;
  private mouse: Mouse;
  private physicsLoop: PhysicsLoop;

  constructor() {
    this.renderer = new CanvasRenderer();
    this.mouse = new Mouse(this.renderer.getCanvas());
    this.physicsLoop = new PhysicsLoop(this.renderer, this.mouse);

    // Initial cloth state
    this.physicsLoop.reset();

    this.setupKeyboard();
    this.addInstructions();

    this.physicsLoop.start();
  }

  private setupKeyboard(): void {
    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        event.preventDefault(); // prevent scrolling
        this.physicsLoop.reset();
      }
    });
  }

  private addInstructions(): void {
    const info = document.createElement('div');
    info.className = 'instructions';
    info.innerHTML = `
      <strong>🧵 Cloth Simulator</strong><br><br>
      <strong>Controls:</strong><br>
      • <span>LMB Drag</span> - Grab and pull cloth<br>
      • <span>RMB Drag</span> - Cut with scissors ✂️<br>
      • <span>SPACE</span> - Reset cloth<br>
    `;
    document.body.appendChild(info);
  }
}

// Bootstrap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new Application());
} else {
  new Application();
}
