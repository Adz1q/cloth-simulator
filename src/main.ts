import { update } from './core/game-loop';
import { Point } from './physics/point';
import './style.css';

const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;

if (!canvas) {
  throw new Error('Canvas element not found');
}

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

if (!ctx) {
  throw new Error('2D context not supported or canvas already initialized');
}

ctx.fillStyle = 'green';
const point = new Point(canvas.width / 2, 1);

// Point Size
const pointWidth = 10;
const pointHeight = 10;

// Positions
let oldY: number;

// Parameters
const FPS = 60;
const g = 9.81;
const a = g;
let v = 0;
const FRAME_INTERVAL_MS = 1000 / FPS;
const dt = FRAME_INTERVAL_MS / 1000;

export function updatePhysics() {
  oldY = point.y;
  v += a;
  point.y = point.y + v * dt + 0.5 * a * dt * dt;
}

export function draw(ctx: CanvasRenderingContext2D) {
  updatePhysics();
  ctx.clearRect(point.x, oldY, pointWidth, pointHeight);
  ctx.fillRect(point.x, point.y, pointWidth, pointHeight);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth - canvasOffsetX;
  canvas.height = window.innerHeight - canvasOffsetY;
});

update();
// function update() {
//   requestAnimationFrame((currentTimeMs) => {
//     const deltaTimeMs = currentTimeMs - previousTimeMs;

//     if (deltaTimeMs >= FRAME_INTERVAL_MS) {
//       updatePhysics();
//       previousTimeMs = currentTimeMs - (deltaTimeMs % FRAME_INTERVAL_MS);
//     }

//     // often desirable to redraw even though it's not every physics update
//     draw();
//     update();
//   });
// }

// calculate new cords and old cords, remove old point, draw new point, repeat
// create game loop (60fps)
// create points, links and fixed points,
// add constraints
//

// Useful
// const pressedKeys = new Set();
// const isKeyDown = (key) => pressedKeys.has(key);
// document.addEventListener('keydown', (e) => pressedKeys.add(e.key));
// document.addEventListener('keyup', (e) => pressedKeys.delete(e.key));

// function updatePhysics() {
//   if (isKeyDown('ArrowLeft')) {
//     player.moveLeft();
//   }
// }

// https://www.aleksandrhovhannisyan.com/blog/javascript-game-loop/
