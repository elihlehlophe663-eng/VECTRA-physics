import type { DoubleSlitParameters, DoubleSlitDerivedData, SlitMode } from '@/lib/doubleSlitPhysics';

interface DSDataPanelProps {
  params: DoubleSlitParameters;
  derived: DoubleSlitDerivedData;
  mode: SlitMode;
  particlesDetected: number;
}

function formatNum(value: number, precision = 2): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) > 9999) return value.toExponential(2);
  if (Math.abs(value) < 0.01 && value !== 0) return value.toExponential(2);
  return value.toFixed(precision);
}

export function DSDataPanel({ params, derived, mode, particlesDetected }: DSDataPanelProps) {
  return (
    <div className="sim-panel">
      <div className="sim-panel-header">
        <span className="sim-panel-title">Live Data</span>
        <span className="ml-auto font-mono text-xs text-accent-cyan">
          {mode === 'double' ? 'INTERFERENCE' : 'DIFFRACTION'}
        </span>
      </div>
      <div className="sim-panel-body">
        <div className="sim-data-row">
          <span className="sim-data-label">Wavelength (λ)</span>
          <span className="sim-data-value">{formatNum(params.wavelength, 0)}</span>
        </div>
        <div className="sim-data-row">
          <span className="sim-data-label">Slit Separation (d)</span>
          <span className="sim-data-value">{formatNum(params.slitSeparation, 0)}</span>
        </div>
        <div className="sim-data-row">
          <span className="sim-data-label">Slit Width (a)</span>
          <span className="sim-data-value">{formatNum(params.slitWidth, 0)}</span>
        </div>
        <div className="sim-data-row">
          <span className="sim-data-label">Screen Distance (L)</span>
          <span className="sim-data-value">{formatNum(params.screenDistance, 0)}</span>
        </div>
        {mode === 'double' && (
          <div className="sim-data-row">
            <span className="sim-data-label">Fringe Spacing (Δy)</span>
            <div className="flex items-baseline gap-1">
              <span className="sim-data-value">{formatNum(derived.fringeSpacing, 1)}</span>
              <span className="sim-data-unit">λL/d</span>
            </div>
          </div>
        )}
        <div className="sim-data-row">
          <span className="sim-data-label">First Minimum (y₁)</span>
          <div className="flex items-baseline gap-1">
            <span className="sim-data-value">{formatNum(derived.firstMinimum, 1)}</span>
            <span className="sim-data-unit">λL/a</span>
          </div>
        </div>

        <div className="h-px bg-surface-border" />

        <div className="sim-data-row">
          <span className="sim-data-label">Particles Detected</span>
          <span className="sim-data-value text-accent-gold">
            {particlesDetected.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
