import React, { useState } from 'react';

export type SimulationStatus = 'Running' | 'Paused' | 'Resetting' | 'Ready' | string;

export interface ShortcutHint {
  key: string;
  label: string;
}

export interface SimulationHUDProps {
  status: SimulationStatus;
  shortcuts?: ShortcutHint[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  moduleTitle?: string;
  className?: string;
  onToggle?: () => void;
  onReset?: () => void;
}

const DEFAULT_SHORTCUTS: ShortcutHint[] = [
  { key: 'Space', label: 'Toggle Animation' },
  { key: 'R', label: 'Reset Visualizer' },
];

export const SimulationHUD: React.FC<SimulationHUDProps> = ({
  status,
  shortcuts = DEFAULT_SHORTCUTS,
  position = 'top-right',
  moduleTitle,
  className = '',
  onToggle,
  onReset,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  // Position coordinates
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  }[position];

  // Status styling colors
  const getStatusBadge = () => {
    switch (status.toLowerCase()) {
      case 'running':
        return {
          textColor: 'text-emerald-400',
          borderColor: 'border-emerald-500/40',
          bgColor: 'bg-emerald-500/10',
          indicatorColor: 'bg-emerald-400',
          label: 'Running',
        };
      case 'paused':
        return {
          textColor: 'text-amber-400',
          borderColor: 'border-amber-500/40',
          bgColor: 'bg-amber-500/10',
          indicatorColor: 'bg-amber-400',
          label: 'Paused',
        };
      case 'resetting':
        return {
          textColor: 'text-cyan-400',
          borderColor: 'border-cyan-500/40',
          bgColor: 'bg-cyan-500/10',
          indicatorColor: 'bg-cyan-400',
          label: 'Resetting...',
        };
      case 'ready':
      default:
        return {
          textColor: 'text-sky-300',
          borderColor: 'border-sky-500/30',
          bgColor: 'bg-sky-500/10',
          indicatorColor: 'bg-sky-400',
          label: status,
        };
    }
  };

  const badge = getStatusBadge();

  return (
    <aside
      aria-label="Simulation Status HUD"
      className={`absolute z-30 ${positionClasses} transition-all duration-200 ease-out select-none ${className}`}
      style={{
        fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="bg-[#0b0f19]/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-3 text-xs text-slate-200 min-w-[200px] max-w-[260px]">
        {/* Header row with Title and Minimize toggle */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-100">
            <span className="text-cyan-400 font-mono text-[11px]">HUD</span>
            {moduleTitle && (
              <>
                <span className="text-slate-600">·</span>
                <span className="text-[11px] text-slate-400 truncate max-w-[120px]">{moduleTitle}</span>
              </>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-slate-200 transition-colors p-0.5 rounded text-[10px]"
            title={collapsed ? 'Expand HUD' : 'Collapse HUD'}
          >
            {collapsed ? '▾ Show' : '▴ Hide'}
          </button>
        </div>

        {/* Status display */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-slate-400 text-[11px]">Status</span>
          <div
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-mono font-medium ${badge.bgColor} ${badge.borderColor} ${badge.textColor}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${badge.indicatorColor}`} />
            <span>{badge.label}</span>
          </div>
        </div>

        {/* Collapsible Shortcut hints list */}
        {!collapsed && (
          <div className="mt-2.5 pt-2 border-t border-white/5 flex flex-col gap-1.5">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              Shortcuts
            </div>
            {shortcuts.map((sc) => (
              <div
                key={sc.key}
                className="flex items-center justify-between gap-2 text-slate-300 text-[11px]"
              >
                <span className="text-slate-400 truncate">{sc.label}</span>
                <kbd className="px-1.5 py-0.5 bg-black/40 border border-white/15 rounded text-[10px] font-mono text-cyan-300">
                  {sc.key}
                </kbd>
              </div>
            ))}

            {/* Quick action buttons if callbacks are provided */}
            {(onToggle || onReset) && (
              <div className="mt-2 pt-2 border-t border-white/5 grid grid-cols-2 gap-1.5">
                {onToggle && (
                  <button
                    onClick={onToggle}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 rounded text-[11px] font-medium text-slate-200 transition-colors"
                  >
                    Toggle
                  </button>
                )}
                {onReset && (
                  <button
                    onClick={onReset}
                    className="px-2 py-1 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 rounded text-[11px] font-medium text-slate-200 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default SimulationHUD;
