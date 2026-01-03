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
  - Real-time cloth manipulation (drag & throw).
  - Dynamic tearing mechanism (RMB to cut constraints).
  - Adjustable environmental parameters (Gravity, Friction, Wind).
- **Zero Dependencies:** Pure TypeScript logic without external physics libraries (like Matter.js or Box2D).

## 🛠️ Tech Stack

- **Language:** TypeScript (Strict Mode)
- **Rendering:** HTML5 Canvas API (2D Context)
- **Tooling:** Vite, pnpm, Prettier
- **Architecture:** Object-Oriented (Point-Constraint Model)

## 📦 Installation & Usage

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
