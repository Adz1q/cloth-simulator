export const CONFIG = {
  // --- Physics Engine ---
  // Acceleration vector [x, y].
  // Note: Positive Y points downwards in Canvas coordinates.
  GRAVITY: [0, 9.81] as const,

  FPS: 60,               // Target simulation frequency
  TIMESTEP: 1000 / 60,   // Fixed delta time (ms) for the accumulator

  // --- Mesh Configuration ---
  // Grid resolution (N x N particles). Warning: O(N^2) complexity.
  // Note: High resolution decreases link length; increase CLOTH_STRENGTH to prevent tearing under self-weight.
  QUALITY: 50,
  
  SOLVES: 3,             // Constraint relaxation iterations (higher = stiffer cloth, more CPU load)
  CLOTH_STRENGTH: 5,     // Tear threshold multiplier relative to rest distance
  DAMPING: 0.999,        // Inertia retention factor (1.0 = no energy loss)

  // --- Interaction Settings ---
  INTERACT_DIST: 60,     // Mouse grab radius (px)
  MOUSE_STRENGTH: 15,    // Force scalar for drag interaction
  CUT_RADIUS: 20,        // Blade radius for RMB cutting

  // --- Viewport ---
  CANVAS_WIDTH: window.innerWidth,
  CANVAS_HEIGHT: window.innerHeight,
} as const;


// --- Derived Constants ---
// Pre-calculated to avoid runtime math in hot loops.
const minDim = Math.min(CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);

// Base resting distance between particles based on grid density.
export const REST_DIST = (0.75 * minDim) / CONFIG.QUALITY;

// Absolute distance limit before a constraint breaks.
export const TEAR_DIST = CONFIG.CLOTH_STRENGTH * REST_DIST;
