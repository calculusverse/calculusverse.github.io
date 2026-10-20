import React, { useState, useEffect, useRef } from 'react';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { SimulationHUD, SimulationStatus } from './components/SimulationHUD';

export default function App() {
  const [status, setStatus] = useState<SimulationStatus>('Running');
  const [time, setTime] = useState(0);
  const [formula, setFormula] = useState('0.2 * x^2');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Toggle animation handler
  const handleToggle = () => {
    setStatus((prev) => (prev === 'Running' ? 'Paused' : 'Running'));
  };

  // Reset visualizer handler
  const handleReset = () => {
    setStatus('Resetting');
    setTime(0);
    setTimeout(() => {
      setStatus('Running');
    }, 400);
  };

  // Integrate the useKeyboardShortcuts hook
  useKeyboardShortcuts({
    onToggle: handleToggle,
    onReset: handleReset,
    enabled: true,
  });

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localTime = time;

    const render = () => {
      if (status === 'Running') {
        localTime += 0.03;
        setTime(localTime);
      }

      const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 400);

      ctx.clearRect(0, 0, width, height);

      // Coordinate axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      const originX = width / 2;
      const originY = (height * 3) / 4;

      ctx.beginPath();
      ctx.moveTo(0, originY);
      ctx.lineTo(width, originY);
      ctx.moveTo(originX, 0);
      ctx.lineTo(originX, height);
      ctx.stroke();

      // Draw mathematical curve
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.4)';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const scale = 40;
      for (let px = 0; px < width; px += 2) {
        const x = (px - originX) / scale;
        const y = 0.2 * x * x; // quadratic parabola
        const py = originY - y * scale;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Moving probe / car point
      const probeX = Math.sin(localTime * 0.8) * 4;
      const probeY = 0.2 * probeX * probeX;
      const probeSlope = 0.4 * probeX;

      const screenPX = originX + probeX * scale;
      const screenPY = originY - probeY * scale;

      // Draw tangent line
      ctx.strokeStyle = '#9d4edd';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const tanLength = 2.5;
      const x1 = probeX - tanLength;
      const y1 = probeY - tanLength * probeSlope;
      const x2 = probeX + tanLength;
      const y2 = probeY + tanLength * probeSlope;
      ctx.moveTo(originX + x1 * scale, originY - y1 * scale);
      ctx.lineTo(originX + x2 * scale, originY - y2 * scale);
      ctx.stroke();

      // Probe point
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(screenPX, screenPY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Moving Car icon
      ctx.font = '22px serif';
      ctx.fillText('🚗', screenPX - 12, screenPY - 12);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [status]);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#0b0f19]/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2 text-lg font-bold">
          <span className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-400 flex items-center justify-center font-mono">
            ∫
          </span>
          <span>Calculus<span className="text-cyan-400">Verse</span></span>
        </div>

        <nav className="flex items-center gap-4 text-xs font-medium text-slate-300">
          <a href="/" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="/toc.html" className="hover:text-cyan-400 transition-colors">Curriculum Map</a>
          <a href="/precalculus.html" className="hover:text-cyan-400 transition-colors">Precalculus</a>
          <a href="/differentiation.html" className="hover:text-cyan-400 transition-colors">Differentiation</a>
          <a href="/integration.html" className="hover:text-cyan-400 transition-colors">Integration</a>
          <a href="/multivariable_3d.html" className="hover:text-cyan-400 transition-colors">3D Multivariable</a>
        </nav>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-1 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Interactive Simulation Playground
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Featuring the <code className="text-cyan-400 font-mono text-xs">SimulationHUD</code> component and <code className="text-cyan-400 font-mono text-xs">useKeyboardShortcuts</code> hook.
          </p>
        </div>

        {/* Canvas Simulation Stage with SimulationHUD */}
        <div className="relative w-full h-[450px] bg-[#060911] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Integrated SimulationHUD component */}
          <SimulationHUD
            status={status}
            moduleTitle="Differentiation Physics"
            position="top-right"
            onToggle={handleToggle}
            onReset={handleReset}
            shortcuts={[
              { key: 'Space', label: 'Toggle Animation' },
              { key: 'R', label: 'Reset Visualizer' },
            ]}
          />

          {/* Bottom telemetry overlay */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-4 bg-[#0b0f19]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs">
            <div>
              <span className="text-slate-400">Time $t$: </span>
              <span className="font-mono text-cyan-400 font-bold">{time.toFixed(2)}s</span>
            </div>
            <div>
              <span className="text-slate-400">Status: </span>
              <span className={`font-mono font-bold ${status === 'Running' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
          <a href="/precalculus.html" className="p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-cyan-400/40 transition-all">
            <div className="text-xs font-mono text-cyan-400 mb-1">MODULE 01</div>
            <div className="font-semibold text-sm">Precalculus & Secants</div>
          </a>
          <a href="/differentiation.html" className="p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-purple-400/40 transition-all">
            <div className="text-xs font-mono text-purple-400 mb-1">MODULE 02</div>
            <div className="font-semibold text-sm">Differentiation & Car Physics</div>
          </a>
          <a href="/integration.html" className="p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-emerald-400/40 transition-all">
            <div className="text-xs font-mono text-emerald-400 mb-1">MODULE 03</div>
            <div className="font-semibold text-sm">Integration & Riemann Sums</div>
          </a>
          <a href="/multivariable_3d.html" className="p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-amber-400/40 transition-all">
            <div className="text-xs font-mono text-amber-400 mb-1">MODULE 04</div>
            <div className="font-semibold text-sm">3D Multivariable & Gradients</div>
          </a>
        </div>
      </main>
    </div>
  );
}
