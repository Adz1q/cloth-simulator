import { Point } from './point';
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
const g = 9.81;
const a = g;
let v = 0;
const frameMs = 10;
const dt = frameMs / 1000;

function calculatePosition(point: Point) {
  oldY = point.y;
  v += a;
  point.y = point.y + v * dt + 0.5 * a * dt * dt;
}

function render(point: Point) {
  calculatePosition(point);
  ctx.clearRect(point.x, oldY, pointWidth, pointHeight);
  ctx.fillRect(point.x, point.y, pointWidth, pointHeight);
}

setInterval(() => {
  render(point);
}, frameMs);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth - canvasOffsetX;
  canvas.height = window.innerHeight - canvasOffsetY;
});

// calculate new cords and old cords, remove old point, draw new point, repeat
