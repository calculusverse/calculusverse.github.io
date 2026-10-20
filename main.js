/**
 * CalculusVerse - Core Shared Library & Web Audio FX Engine
 * Author: Md Ikramul Hoque Arik (Gachbaria Govt College)
 */

// ==========================================
// 1. WEB AUDIO PROCEDURAL SOUND ENGINE
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('calculusverse_sound_enabled') !== 'false';
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('calculusverse_sound_enabled', this.enabled ? 'true' : 'false');
    this.updateToggleButtons();
    if (this.enabled) {
      this.init();
      this.playChime();
    }
    return this.enabled;
  }

  updateToggleButtons() {
    document.querySelectorAll('.sound-toggle-btn').forEach(btn => {
      if (this.enabled) {
        btn.classList.add('sound-on');
        btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> Sound: ON`;
      } else {
        btn.classList.remove('sound-on');
        btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg> Sound: OFF`;
      }
    });
  }

  // Soft high-frequency click
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Slider scrub tick with variable pitch
  playSliderTick(normVal = 0.5) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const freq = 350 + normVal * 500; // 350Hz - 850Hz

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {}
  }

  // Subtle 3-second drawing tone sweep
  playDrawSweep(duration = 3.0) {
    if (!this.enabled) return null;
    this.init();
    if (!this.ctx) return null;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(587.33, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.035, this.ctx.currentTime + duration - 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);

      return { osc, gain };
    } catch (e) {
      return null;
    }
  }

  // Harmonic completion chime (C5 - E5 - G5)
  playChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0.06, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.4);
      });
    } catch (e) {}
  }
}

export const sound = new SoundFX();

// ==========================================
// 2. MATHEMATICAL FORMULA EVALUATION ENGINE
// ==========================================
export function createMathEvaluator(expressionStr) {
  // Clean string and translate common notations
  let clean = expressionStr
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/(\d+)([a-z])/g, '$1*$2') // 2x -> 2*x
    .replace(/\^/g, '**')              // x^2 -> x**2
    .replace(/sin/g, 'Math.sin')
    .replace(/cos/g, 'Math.cos')
    .replace(/tan/g, 'Math.tan')
    .replace(/exp/g, 'Math.exp')
    .replace(/log/g, 'Math.log')
    .replace(/sqrt/g, 'Math.sqrt')
    .replace(/abs/g, 'Math.abs')
    .replace(/pi/g, 'Math.PI')
    .replace(/e\b/g, 'Math.E');

  try {
    // Test evaluation safely with x=1
    const testFn = new Function('x', `try { return (${clean}); } catch(e) { return NaN; }`);
    const val = testFn(1);
    if (typeof val === 'number') {
      return (x) => {
        try {
          const res = testFn(x);
          return isFinite(res) ? res : NaN;
        } catch {
          return NaN;
        }
      };
    }
  } catch (err) {
    console.warn("Formula parser error:", err);
  }

  // Fallback to quadratic default
  return (x) => x * x;
}

// Numerical derivative helper: f'(x) ≈ (f(x+h) - f(x-h)) / (2h)
export function numericalDerivative(fn, x, h = 0.0001) {
  const fPlus = fn(x + h);
  const fMinus = fn(x - h);
  if (isNaN(fPlus) || isNaN(fMinus)) return 0;
  return (fPlus - fMinus) / (2 * h);
}

// Numerical integration helper: Simpson's Rule
export function numericalIntegral(fn, a, b, n = 200) {
  if (a === b) return 0;
  if (n % 2 !== 0) n++; // Simpson requires even n
  const h = (b - a) / n;
  let sum = fn(a) + fn(b);

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    const y = fn(x);
    if (!isNaN(y)) {
      sum += (i % 2 === 0 ? 2 : 4) * y;
    }
  }
  return (sum * h) / 3;
}

// ==========================================
// 3. BACKGROUND CANVAS PARTICLE STARFIELD
// ==========================================
export function initBackgroundParticles() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Subtle coordinate lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1;
    const gridSize = 80;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Particle nodes
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = `rgba(0, 242, 254, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Connecting lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.12 * (1 - dist / 110)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

// ==========================================
// 4. KATEX SAFE RENDERING UTILITY
// ==========================================
export function renderMathInElement(el, tex, displayMode = false) {
  if (!el) return;
  if (window.katex) {
    try {
      window.katex.render(tex, el, {
        throwOnError: false,
        displayMode: displayMode,
      });
    } catch (e) {
      el.textContent = tex;
    }
  } else {
    el.textContent = tex;
  }
}

// Render all equations on page into real mathematical typesetting
export function renderAllMath() {
  // 1. If KaTeX auto-render extension is available, run it on document.body
  if (typeof window.renderMathInElement === 'function') {
    try {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false }
        ],
        throwOnError: false
      });
    } catch (e) {}
  }

  // 2. Render all explicit data-katex elements
  if (window.katex) {
    document.querySelectorAll('[data-katex]').forEach(el => {
      const tex = el.getAttribute('data-katex');
      const isDisplay = el.getAttribute('data-display') === 'true';
      if (tex) {
        try {
          window.katex.render(tex, el, {
            throwOnError: false,
            displayMode: isDisplay
          });
        } catch (e) {}
      }
    });

    // 3. Scan math cards and elements that still have unrendered dollar signs
    document.querySelectorAll('.math-display-card > div:not(.math-title), .math-formula').forEach(el => {
      const raw = el.textContent || '';
      if (raw.includes('$') && !el.querySelector('.katex')) {
        const cleaned = raw.replace(/^\$+|\$+$/g, '').trim();
        try {
          window.katex.render(cleaned, el, {
            throwOnError: false,
            displayMode: false
          });
        } catch (e) {}
      }
    });
  }
}

// ==========================================
// 5. GLOBAL INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundParticles();
  sound.updateToggleButtons();

  // Attach sound toggle handlers
  document.querySelectorAll('.sound-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.toggle();
    });
  });

  // Attach soft click sound to all interactive buttons
  document.querySelectorAll('button, .btn-primary, .btn-secondary, .segmented-btn, .nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
    });
  });

  // Attach slider tick audio
  document.querySelectorAll('input[type="range"]').forEach(slider => {
    slider.addEventListener('input', () => {
      const min = parseFloat(slider.min) || 0;
      const max = parseFloat(slider.max) || 100;
      const val = parseFloat(slider.value) || 0;
      const norm = (val - min) / (max - min);
      sound.playSliderTick(norm);
    });
  });

  // KaTeX typesetting with sequential retries to ensure CDN script has loaded
  renderAllMath();
  setTimeout(renderAllMath, 100);
  setTimeout(renderAllMath, 350);
  setTimeout(renderAllMath, 800);
});

// ==========================================
// 6. GLOBAL KEYBOARD SHORTCUTS MANAGER
// ==========================================
export function setupSimulationShortcuts({ onToggleAnimation, onReset } = {}) {
  window.addEventListener('keydown', (e) => {
    // Ignore keystrokes when typing in inputs or select boxes
    const active = document.activeElement;
    const tag = active ? active.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || active?.isContentEditable) {
      return;
    }

    if (e.code === 'Space') {
      e.preventDefault();
      if (typeof onToggleAnimation === 'function') {
        sound.playClick();
        onToggleAnimation();
      }
    } else if (e.code === 'KeyR' || e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      if (typeof onReset === 'function') {
        sound.playClick();
        onReset();
      }
    }
  });
}

// ==========================================
// 7. SIMULATION HUD COMPONENT FOR CANVAS
// ==========================================
export function createSimulationHUD({
  container,
  status = 'Running',
  moduleTitle = '',
  shortcuts = [
    { key: 'Space', label: 'Toggle Animation' },
    { key: 'R', label: 'Reset Visualizer' }
  ],
  position = 'top-right',
  onToggle = null,
  onReset = null
}) {
  if (!container) return null;

  const posStyles = {
    'top-right': 'top: 14px; right: 14px;',
    'top-left': 'top: 14px; left: 14px;',
    'bottom-right': 'bottom: 14px; right: 14px;',
    'bottom-left': 'bottom: 14px; left: 14px;',
  }[position] || 'top: 14px; right: 14px;';

  const hudEl = document.createElement('div');
  hudEl.className = 'simulation-hud-overlay';
  hudEl.style.cssText = `
    position: absolute;
    ${posStyles}
    z-index: 25;
    background: rgba(11, 15, 25, 0.90);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    padding: 0.65rem 0.85rem;
    font-size: 0.75rem;
    color: #f8fafc;
    min-width: 190px;
    max-width: 250px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    user-select: none;
    font-family: 'Outfit', sans-serif;
  `;

  let currentStatus = status;
  let isCollapsed = false;

  function renderHUD() {
    let statusClass = 'color: #38bdf8; border-color: rgba(56, 189, 248, 0.3); background: rgba(56, 189, 248, 0.1);';
    let dotColor = '#38bdf8';
    const sLower = currentStatus.toLowerCase();
    if (sLower === 'running') {
      statusClass = 'color: #34d399; border-color: rgba(52, 211, 153, 0.35); background: rgba(52, 211, 153, 0.1);';
      dotColor = '#34d399';
    } else if (sLower === 'paused') {
      statusClass = 'color: #fbbf24; border-color: rgba(251, 191, 36, 0.35); background: rgba(251, 191, 36, 0.1);';
      dotColor = '#fbbf24';
    } else if (sLower === 'resetting') {
      statusClass = 'color: #00f2fe; border-color: rgba(0, 242, 254, 0.35); background: rgba(0, 242, 254, 0.1);';
      dotColor = '#00f2fe';
    }

    hudEl.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding-bottom: 0.4rem; border-bottom: 1px solid rgba(255,255,255,0.08);">
        <div style="display: flex; align-items: center; gap: 0.35rem; font-weight: 600;">
          <span style="color: var(--neon-cyan); font-family: var(--font-mono); font-size: 0.7rem;">HUD</span>
          ${moduleTitle ? `<span style="color: #64748b;">·</span><span style="color: #94a3b8; font-size: 0.7rem;">${moduleTitle}</span>` : ''}
        </div>
        <button id="hudCollapseBtn" style="background: none; border: none; color: #94a3b8; font-size: 0.65rem; cursor: pointer;">
          ${isCollapsed ? '▾ Show' : '▴ Hide'}
        </button>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 0.45rem;">
        <span style="color: #94a3b8; font-size: 0.72rem;">Status</span>
        <span style="display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.15rem 0.45rem; border-radius: 5px; border: 1px solid; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 600; ${statusClass}">
          <span style="width: 5px; height: 5px; border-radius: 50%; background: ${dotColor};"></span>
          <span>${currentStatus}</span>
        </span>
      </div>

      ${!isCollapsed ? `
        <div style="margin-top: 0.5rem; padding-top: 0.45rem; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 0.3rem;">
          <div style="font-size: 0.65rem; text-transform: uppercase; color: #64748b; font-weight: 600; letter-spacing: 0.05em;">Shortcuts</div>
          ${shortcuts.map(sc => `
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.72rem; color: #cbd5e1;">
              <span style="color: #94a3b8;">${sc.label}</span>
              <kbd class="kbd-hint" style="margin: 0;">${sc.key}</kbd>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;

    hudEl.querySelector('#hudCollapseBtn')?.addEventListener('click', () => {
      isCollapsed = !isCollapsed;
      renderHUD();
    });
  }

  renderHUD();
  container.appendChild(hudEl);

  return {
    setStatus: (newStatus) => {
      currentStatus = newStatus;
      renderHUD();
    },
    element: hudEl
  };
}

