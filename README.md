# Verlet Cloth Simulation Engine

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite)

A high-performance, dependency-free physics engine simulating cloth dynamics using **Verlet Integration**.
Built from scratch with TypeScript and HTML5 Canvas API to demonstrate numerical stability in soft-body simulations.

---

## 🚀 Key Features

- **Physics Core:** Implemented using Verlet Integration scheme `x(t+dt) = 2x(t) - x(t-dt) + a*dt^2` for superior stability over Euler methods.
- **Constraint Solving:** Custom iterative relaxation algorithm to simulate tensile strength of the fabric.
- **Performance:** Rendering optimized via raw HTML5 Canvas API (no WebGL overhead), capable of handling hundreds of particles at 60 FPS.
- **Interactivity:**
  - Real-time cloth manipulation (drag \& throw).
  - Dynamic tearing mechanism (RMB to cut constraints).
  - Adjustable environmental parameters (Gravity, Friction, Wind).
- **Zero Dependencies:** Pure TypeScript logic without external physics libraries (like Matter.js or Box2D).


## 🛠️ Tech Stack

- **Language:** TypeScript (Strict Mode)
- **Rendering:** HTML5 Canvas API (2D Context)
- **Tooling:** Vite, pnpm, Prettier
- **Architecture:** Object-Oriented (Point-Constraint Model)


## 📦 Installation \& Usage

### Prerequisites

- Node.js (LTS version recommended, e.g., v20+)
- pnpm (recommended) or npm


### 1. Clone the repository

```bash
git clone [https://github.com/adz1q/cloth-simulator.git](https://github.com/adz1q/cloth-simulator.git)
```


### 2. Open the project

```bash
cd cloth-simulator
```


### 3. Install dependencies

```bash
pnpm install
```


### 4. Run Development Server

Starts a local dev server with HMR (Hot Module Replacement).

```bash
pnpm dev
```

> Open `http://localhost:5173` in your browser.

### 5. Build for Production

Compiles TypeScript to optimized JavaScript and generates static files in `dist/`.

```bash
pnpm build
```


### 6. Preview Production Build

Test the compiled build locally before deployment.

```bash
pnpm preview
```


## 🎮 Controls

| Input | Action |
| :-- | :-- |
| **Left Mouse Button (Drag)** | Grab and move fabric particles |
| **Right Mouse Button** | Cut/Slice the fabric (remove constraints) |
| **Sliders (UI)** | Adjust Gravity, Friction, and Tear Sensitivity |

## 🧮 Mathematical Background

This engine abandons traditional velocity-based physics. Instead of storing velocity `v`, it derives motion implicitly from the current and previous positions:

\$ v \approx \frac{x_{current} - x_{old}}{\Delta t} \$

This approach (Verlet Integration) is symplectic, meaning it conserves energy better than standard Euler integration, making it ideal for interconnected systems like cloth, ropes, or chains.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

Here is the updated, professional `README.md`. I have updated the technical details to reflect the high-level architecture changes we just implemented (Decoupled Physics Loop \& Accumulated Input) and added the requested section about configuration.

***

# Verlet Cloth Simulation Engine

A production-grade, deterministic physics engine simulating cloth dynamics using **Verlet Integration**.

Built from scratch with TypeScript and HTML5 Canvas API, this project demonstrates advanced game loop architecture, featuring a **decoupled physics timestep** and **sub-stepped input handling** to ensure numerical stability across variable refresh rates (from 30Hz to 240Hz+).

***

## 🚀 Key Features

- **Deterministic Physics Architecture:**
    - Utilizes a **Fixed Timestep Accumulator** pattern.
    - Decouples simulation logic (update) from rendering (draw), ensuring physics behave identically on high-end gaming rigs and low-power laptops.
- **High-Frequency Input Solver:**
    - Implements **Accumulated Input Strategy**.
    - Prevents "input loss" on high refresh rate monitors (e.g., 144Hz/240Hz) by interpolating mouse movement across physics substeps.
- **Verlet Integration Core:**
    - Position-based dynamics (`x(t+dt) = 2x(t) - x(t-dt) + a*dt^2`) provide superior stability over Euler methods for interconnected constraints.
- **Interactive Sandbox:**
    - Real-time interaction (Drag \& Throw).
    - Dynamic topology modification (Right-click to cut constraints).
- **Zero Dependencies:**
    - Pure TypeScript logic without external physics libraries (like Matter.js or Box2D).


## ⚙️ Configuration

The simulation is designed to be fully data-driven. You can fine-tune all physics parameters, constraints, and interaction settings in the configuration file.

**File Location:** `src/config.ts`

You can freely edit parameters such as:

- **`TIMESTEP`**: The fixed time slice for physics calculations (default: ~16ms).
- **`GRAVITY`**: Vector components for environmental gravity.
- **`MOUSE_STRENGTH`**: The force multiplier for user interaction.
- **`SOLVES`**: Iteration count for constraint relaxation (higher = stiffer cloth).
- **`DAMPING`**: Air resistance/friction factor.

```typescript
// Example src/config.ts
export const CONFIG = {
  TIMESTEP: 1000 / 60,  // Physics runs at 60hz logically
  GRAVITY: [0, 980],    // Downward force
  DAMPING: 0.99,        // Conservation of energy
  SOLVES: 5,            // Constraint stiffness
  // ...
};
```


## 🛠️ Tech Stack

- **Language:** TypeScript (Strict Mode)
- **Rendering:** HTML5 Canvas API (2D Context)
- **Tooling:** Vite, pnpm, Prettier
- **Architecture:** Object-Oriented (Entity-Component style logic with decoupled game loop)


## 📦 Installation \& Usage

### Prerequisites

- Node.js (LTS version recommended, e.g., v20+)
- pnpm (recommended) or npm


### 1. Clone the repository

```bash
git clone https://github.com/adz1q/cloth-simulator.git
```


### 2. Open the project

```bash
cd cloth-simulator
```


### 3. Install dependencies

```bash
pnpm install
```


### 4. Run Development Server

Starts a local dev server with HMR (Hot Module Replacement).

```bash
pnpm dev
```

> Open `http://localhost:5173` in your browser.

### 5. Build for Production

Compiles TypeScript to optimized JavaScript and generates static files in `dist/`.

```bash
pnpm build
```


### 6. Preview Production Build

Test the compiled build locally before deployment.

```bash
pnpm preview
```


## 🎮 Controls

| Input | Action |
| :-- | :-- |
| **Left Mouse Button (Drag)** | Grab and move fabric particles. Force is interpolated for stability. |
| **Right Mouse Button** | Cut/Slice the fabric (removes links between particles). |
| **Config File** | Modify `src/config.ts` to change physics behavior. |

## 🧮 Mathematical Background

This engine abandons traditional velocity-based physics. Instead of storing velocity `v`, it derives motion implicitly from the current and previous positions:

$$
v \approx \frac{x_{current} - x_{old}}{\Delta t}
$$

This approach (Verlet Integration) is **symplectic**, meaning it conserves energy better than standard Euler integration, making it ideal for simulating constraints like cloth, ropes, or chains where maintaining distance between points is critical.

***

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
