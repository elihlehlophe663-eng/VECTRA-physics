import type { DoubleSlitControls } from '@/hooks/useDoubleSlitSimulation';

interface DSModeSelectorProps {
  controls: DoubleSlitControls;
}

export function DSModeSelector({ controls }: DSModeSelectorProps) {
  const { mode, setMode } = controls;

  return (
    <div className="sim-panel">
      <div className="sim-panel-header">
        <span className="sim-panel-title">Slit Mode</span>
      </div>
      <div className="sim-panel-body">
        <div className="flex gap-2">
          <button
            onClick={() => setMode('double')}
            className={`flex-1 rounded-lg border px-3 py-2.5 font-display text-sm font-medium transition-all ${
              mode === 'double'
                ? 'border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan'
                : 'border-surface-border bg-space-700/30 text-star-white/40 hover:text-star-white'
            }`}
          >
            Double Slit
          </button>
          <button
            onClick={() => setMode('single')}
            className={`flex-1 rounded-lg border px-3 py-2.5 font-display text-sm font-medium transition-all ${
              mode === 'single'
                ? 'border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan'
                : 'border-surface-border bg-space-700/30 text-star-white/40 hover:text-star-white'
            }`}
          >
            Single Slit
          </button>
        </div>
        <p className="font-mono text-[0.7rem] leading-relaxed text-star-white/30">
          {mode === 'double'
            ? 'Both slits open — interference fringes appear from the cos² term.'
            : 'One slit open — only the diffraction envelope is visible.'}
        </p>
      </div>
    </div>
  );
}
