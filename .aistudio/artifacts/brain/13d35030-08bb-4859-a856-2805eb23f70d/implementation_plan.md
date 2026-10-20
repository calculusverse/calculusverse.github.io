# CalculusVerse: Interactive High-School Calculus Universe

CalculusVerse is a high-interactivity, production-grade educational platform built to transform calculus from an intimidating abstract subject into a dynamic, intuitive, and tactile experience for 10th-grade students. It features progressive 3-second animated graph draws, real-world car/clock physics simulations, interactive Riemann sums, and an interactive Three.js 3D multivariable surface explorer with tangent planes and gradient vectors.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following author credentials and communication preferences provided by the user are confirmed and integrated directly into the design:

- **Confirmed Author Details**:
  - **Author**: Md Ikramul Hoque Arik
  - **Institution**: Gachbaria Govt College
  - **WhatsApp**: `+8801572936762` (preconfigured with a direct link and encouragement/critique starter text: `https://wa.me/8801572936762?text=Hi%20Arik,%20I%20am%20using%20CalculusVerse%20and%20wanted%20to%20share%20my%20feedback:`)
  - **Email**: `mdikramulhoquearik@gmail.com`
  - **Portfolio**: `https://IkramulHoque-Arik.github.io`
  - **Author's Mission Note**: *"If this software truly helps you understand calculus, you don't need to send me money—just send a thank-you note or a motivational message! And if you don't like it, feel free to send some constructive criticism (or even a little tough love!) on WhatsApp."*
- **Confirmed Technical Design**:
  - **Multi-Page Modular Architecture**: Separate, clean HTML pages (`index.html`, `toc.html`, `precalculus.html`, `differentiation.html`, `integration.html`, `multivariable_3d.html`), centralized glassmorphic styling (`styles.css`), shared navigation/sound engine (`main.js`), and isolated visualizer scripts.
  - **Procedural Web Audio Engine**: Zero external audio files; synthesized harmonic beeps, curve sweep whooshes, and slope chimes using the native Web Audio API with a persistent mute/unmute control.
  - **Formula Parsing & KaTeX Math Rendering**: Safe, client-side math expression evaluation paired with KaTeX for textbook-grade typesetting.

---

### 1. Overview & Core Concept

- **What It Does**: Delivers an exploratory learning playground for single-variable and introductory multivariable calculus tailored to high school sophomores. Instead of static textbook formulas, concepts are discovered through hands-on geometric sliders, progressive graph drawing animations, physical vehicle velocity simulations, and 3D WebGL vector fields.
- **Target Audience**: 10th-grade high school students (ages 14–16), beginner STEM enthusiasts, and teachers seeking intuitive visual aids that dismantle math anxiety.
- **Key Educational Pillars**:
  1. *Motion Over Memory*: Derivatives are introduced as instantaneous speedometer readings of a moving car, not just memorized power rules.
  2. *Accumulation Over Abstraction*: Integrals are introduced as summing tangible rectangular tiles under a curve before shrinking their widths.
  3. *Spatial Intuition*: 3D gradients are understood as rolling a marble down a mountain or climbing the steepest path on a 3D hill.

---

### 2. User Experience & Visual Design

#### A. Aesthetic Direction & Glassmorphism Theme
- **Color Palette & Contrast (60-30-10 Rule)**:
  - **60% Dominant Canvas**: Deep Space Obsidian (`#0B0F19`), with dynamic canvas starfield/grid particles.
  - **30% Structural Panels**: Translucent frosted glass cards (`rgba(255, 255, 255, 0.04)` to `rgba(255, 255, 255, 0.07)` with `backdrop-filter: blur(16px)` and subtle hairline borders `rgba(255, 255, 255, 0.1)`).
  - **10% Semantic Accents**:
    - Neon Cyan (`#00F2FE`) for tangent lines, primary curves, and main CTAs.
    - Vibrant Purple (`#9D4EDD`) for secant lines and function transformations.
    - Emerald Green (`#10B981`) for Riemann sums, area calculations, and positive slopes.
    - Warm Gold (`#F59E0B`) for tangent planes and physical road markers.
    - Electric Blue (`#4FACFE`) for gradient vectors and velocity vectors.
- **Typography & Formatting**:
  - **Display Face**: *Outfit* (Google Fonts, weights 600, 700) for hero banners and clear chapter headers.
  - **Body Prose**: *Plus Jakarta Sans* (Google Fonts, weights 400, 500) for explanatory step guides.
  - **Math Typesetting**: *KaTeX* for equations like $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$ and $\int_a^b f(x)\,dx$.
  - **Tabular Figures**: Monospace `tabular-nums` for live coordinate coordinates, slopes, and Riemann totals.
  - **Anti-AI Slop Cleanliness**: Zero decorative pill badges, zero fake compiler/telemetry code comments, natural editorial titling (`01. Rate of Change`, `02. Tangent Physics`), and fully wired controls.

#### B. Page Walkthrough & Layout Specifications

```
┌────────────────────────────────────────────────────────────────────────┐
│ TOP BAR: CalculusVerse [Logo] ──── Modules ──── Sound [Toggle] ─────── │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   INDEX: Hero Particle Canvas + Big CTA + Author Card (WhatsApp)       │
│                                                                        │
│   TOC: Curriculum Map with 4 Core Visual Chapters & Difficulty Badges  │
│                                                                        │
│   MODULE 1: Precalculus & Function Transformation Workbench           │
│                                                                        │
│   MODULE 2: Differentiation (3s Draw, Tangent Slider, Car Physics)     │
│                                                                        │
│   MODULE 3: Integration (3s Draw, Left/Right/Mid/Trap, Riemann Sums)   │
│                                                                        │
│   MODULE 4: 3D Multivariable (Three.js Orbit, Tangent Plane, Gradient) │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

1. **`index.html` (Landing Page)**:
   - Dynamic canvas backdrop of floating mathematical coordinate particle grid.
   - Hero Headline: *"CalculusVerse: Experience Math in Motion"* with subtitle tailored for 10th-grade clarity.
   - Primary Action: Glowing *"Start Learning Calculus"* button navigating to `toc.html`.
   - Author Profile Card (Md Ikramul Hoque Arik, Gachbaria Govt College):
     - Profile badge, author note regarding free educational access and feedback.
     - Direct WhatsApp feedback button linking to `https://wa.me/8801572936762`.
     - Direct links to Email (`mdikramulhoquearik@gmail.com`) and Portfolio (`IkramulHoque-Arik.github.io`).
2. **`toc.html` (Curriculum Map)**:
   - 4 Interactive track cards:
     - Track 1: *Precalculus & Functions* (Parent functions, shifts, secant slopes).
     - Track 2: *Differential Calculus* (The instantaneous rate of change, tangent lines, velocity car).
     - Track 3: *Integral Calculus* (Accumulation of slices, Riemann sums, fundamental theorem).
     - Track 4: *3D Multivariable Calculus* (Surfaces $z = f(x, y)$, tangent planes, gradient vectors).
   - Time estimates, prerequisites, and learning objectives for each track.
3. **`precalculus.html` (Module 1: Foundations & Function Transformations)**:
   - Interactive function builder $y = a \cdot f(b(x - c)) + d$ with live sliders for vertical stretch ($a$), horizontal compression ($b$), horizontal shift ($c$), and vertical shift ($d$).
   - Interactive Secant-to-Tangent Explorer: Drag point $Q$ closer to point $P$ and watch $\Delta x = h \to 0$ as the secant line transforms into the tangent line.
4. **`differentiation.html` (Module 2: Differentiation & Velocity Physics)**:
   - **3-Second Animated Graph Draw Effect**: When a function preset is selected or custom formula entered, a 3000ms progressive canvas animation draws the curve point-by-point along the x-axis with an accompanying subtle frequency-sweep sound.
   - **Interactive Tangent & Secant Visualizer**:
     - Slider for $x_0 \in [-5, 5]$ with numerical readout of $f(x_0)$ and instantaneous slope $f'(x_0)$.
     - Real-time rendering of tangent line $y = f'(x_0)(x - x_0) + f(x_0)$, showing whether slope is positive (uphill), negative (downhill), or zero (critical peak/valley).
   - **Real-World Car & Clock Physics Simulator**:
     - Graph axes clearly labeled with SVG icons: 🚗 Car on Y-axis (Distance $s(t)$ or Velocity $v(t)$) and ⏰ Clock on X-axis (Time $t$).
     - Real-world animated car track beneath the graph: A mini car drives along a physical road in real-time, its position and speed directly matching the mathematical function $s(t) = t^2$ or $s(t) = \frac{1}{3}t^3 - 2t^2 + 3t$.
     - Play/Pause/Reset timeline controls and speed scrub slider.
5. **`integration.html` (Module 3: Integral Calculus & Riemann Sums)**:
   - **3-Second Animated Graph Draw Effect** for the curve $f(x)$.
   - **Interactive Riemann Sum Partitioning**:
     - Partition slider $n \in [1, 50]$ with instant recalculation.
     - Mode toggles: Left Riemann Sum, Right Riemann Sum, Midpoint Sum, and Trapezoidal Rule.
     - Interactive interval bounds $[a, b]$ adjustable via sliders or draggable boundary handles.
     - Real-time comparison display: Approximate Area vs. Exact Integral $\int_a^b f(x)\,dx$ with percentage error readout, demonstrating how $\lim_{n \to \infty} \sum = \int$.
6. **`multivariable_3d.html` (Module 4: 3D Multivariable Calculus)**:
   - High-performance Three.js WebGL scene with orbit controls (rotate, pan, zoom).
   - Multiple 3D surface presets:
     - Saddle surface: $z = x^2 - y^2$
     - Circular ripples: $z = \sin(\sqrt{x^2 + y^2})$
     - Paraboloid bowl: $z = x^2 + y^2$
     - Monkey saddle / cubic wave: $z = x^3 - 3xy^2$
   - Movable probe $(x_0, y_0)$ on the surface with interactive coordinate controls.
   - Dynamic 3D Tangent Plane calculated using partial derivatives $\frac{\partial z}{\partial x}$ and $\frac{\partial z}{\partial y}$.
   - 3D Gradient Vector Arrow $\nabla f(x_0, y_0) = \left\langle \frac{\partial z}{\partial x}, \frac{\partial z}{\partial y} \right\rangle$ rendered in electric blue pointing in the direction of steepest ascent.
   - Sleek, collapsible bottom control dock that never occludes the 3D model.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Native HTML5 Canvas + WebGL Multi-Page Application vs. Single Page React App**:
  - *Chosen Approach*: Multi-page static architecture with individual HTML documents for each module, styled with unified modern CSS and modular vanilla JS.
  - *Why*: The user explicitly specified: *"Do NOT combine everything into a single file. Create a clean, modular multi-page static site with the following file structure: index.html, toc.html, precalculus.html, differentiation.html, integration.html, multivariable_3d.html, styles.css, main.js"*. This ensures zero framework bloat, fast load times, and crystal-clear educational focus.
  - *Alternatives Considered*: Bundling everything into a single React router app was explicitly rejected to honor the requested file structure.
- **Decision 2: 3-Second Progressive Draw Animation Engine**:
  - *Chosen Approach*: A custom timestamped interpolation loop (`requestAnimationFrame`) over a 3000ms duration with easing curve, drawing the curve segment-by-segment from $x_{\min}$ to $x_{\max}$.
  - *Why*: Fulfills the explicit key requirement that graphs do not instantly pop into view like Desmos, but develop smoothly so students see how output values grow as input advances.
- **Decision 3: Web Audio API Procedural Sound Engine**:
  - *Chosen Approach*: Pure JavaScript Web Audio API synthesizer generating soft sine wave tones, pitch-scaled clicks on slider scrub, and a soothing completion chime.
  - *Why*: Zero network requests for audio files (no 404 risk), low latency (<10ms), and full student engagement. A global audio mute toggle is remembered across pages in `localStorage`.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CALCULUSVERSE SYSTEM ARCHITECTURE               │
└────────────────────────────────────────────────────────────────────────┘

 [Shared Assets & Core Engine]
       │
       ├── styles.css  (Glassmorphism, Neon Palettes, KaTeX Layout, Responsive)
       │
       ├── main.js     (Global Nav, SoundFX Web Audio API, Math Evaluator)
       │
       ├── KaTeX CDN   (High-precision LaTeX Mathematical Notation)
       │
       └── Three.js    (WebGL 3D Orbit Controls, PBR Materials, Mesh Shaders)

 [Individual Module Pages]
       │
       ├── index.html           (Hero Canvas + Author Card + WhatsApp Direct)
       ├── toc.html             (Curriculum Map & Progression Guides)
       ├── precalculus.html     (Function Transformations & Secant Limits)
       ├── differentiation.html (3s Progressive Draw, Tangent, Car Physics)
       ├── integration.html     (3s Progressive Draw, Riemann Sums, Area)
       └── multivariable_3d.html(Three.js 3D Surface, Tangent Plane, Gradient)
```

#### State & Interactive Control Mapping

| Page | State Variables | User Controls | Output / Render |
| :--- | :--- | :--- | :--- |
| `differentiation.html` | $x_0, f(x)$, isAnimating, time $t$, carPos | Preset buttons, custom formula input, $x_0$ slider, car play/pause | 3s progressive curve, tangent line, slope badge, mini-car simulation |
| `integration.html` | $f(x), a, b, n$, method (L, R, Mid, Trap) | Formula presets, partition slider ($1..50$), method toggle tabs, bounds $a, b$ | Shaded Riemann rectangles, approximate vs. exact integral comparison |
| `multivariable_3d.html` | Surface formula, $x_0, y_0$, showPlane, showGrad | Preset surface pills, $(x_0, y_0)$ position sliders, plane/gradient toggles | 3D surface mesh, transparent tangent plane, 3D gradient vector arrow |
| `precalculus.html` | $a, b, c, d$, point $P$, point $Q$ | Transformation sliders, secant distance $h$ slider | Transformed curve vs parent curve, secant line slope approaching $f'(x)$ |
| `main.js` | `soundEnabled` (localStorage) | Sound toggle in top navigation bar | Dynamic sine oscillator audio chirps on sliders and graph draws |

---

### Verification & Testing Plan
- Compile and build validation using Vite to verify all 6 HTML entry points and assets.
- Cross-browser Canvas and WebGL initialization checks.
- Verification of 3000ms progressive path animation timing.
- Physics timeline synchronization between the mathematical derivative and the animated car track.
- Formula parsing safety and exact numerical integration calculation check against Riemann approximations.
- Validation of author card links: WhatsApp prefilled URL, email mailto, and portfolio address.
