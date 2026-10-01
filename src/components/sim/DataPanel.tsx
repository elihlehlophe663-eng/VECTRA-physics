import type { OrbitalData, OrbitClassification } from '@/lib/orbitalPhysics';

interface DataPanelProps {
  data: OrbitalData;
}

const classificationColors: Record<OrbitClassification, string> = {
  Circular: 'text-emerald-400',
  Elliptical: 'text-accent-cyan',
  Parabolic: 'text-accent-gold',
  Hyperbolic: 'text-rose-400',
  Collision: 'text-red-500',
};

function formatNumber(value: number, precision = 3): string {
  if (!Number.isFinite(value)) return '—';
  if (Math.abs(value) > 99999) return value.toExponential(2);
  if (Math.abs(value) < 0.001 && value !== 0) return value.toExponential(2);
  return value.toFixed(precision);
}

export function DataPanel({ data }: DataPanelProps) {
  const cls = classificationColors[data.classification];

  return (
    <div className="sim-panel">
      <div className="sim-panel-header">
        <span className="sim-panel-title">Live Data</span>
        <span className={`ml-auto font-mono text-xs font-medium ${cls}`}>
          {data.classification.toUpperCase()}
        </span>
      </div>
      <div className="sim-panel-body">
        <div className="sim-data-row">
          <span className="sim-data-label">Distance</span>
          <div className="flex items-baseline gap-1">
            <span className="sim-data-value">{formatNumber(data.distance)}</span>
            <span className="sim-data-unit">AU*</span>
          </div>
        </div>
        <div className="sim-data-row">
          <span className="sim-data-label">Velocity</span>
          <div className="flex items-baseline gap-1">
            <span className="sim-data-value">{formatNumber(data.speed)}</span>
            <span className="sim-data-unit">v</span>
          </div>
        </div>
        <div className="sim-data-row">
          <span className="sim-data-label">Acceleration</span>
          <div className="flex items-baseline gap-1">
            <span className="sim-data-value">{formatNumber(data.acceleration)}</span>
            <span className="sim-data-unit">a</span>
          </div>
        </div>
        <div className="sim-data-row">
          <span className="sim-data-label">Spec. Energy (ε)</span>
          <div className="flex items-baseline gap-1">
            <span className="sim-data-value">{formatNumber(data.specificEnergy)}</span>
            <span className="sim-data-unit">ε</span>
          </div>
        </div>
        <div className="sim-data-row">
          <span className="sim-data-label">Ang. Momentum (|h|)</span>
          <div className="flex items-baseline gap-1">
            <span className="sim-data-value">{formatNumber(data.angularMomentumMag)}</span>
            <span className="sim-data-unit">h</span>
          </div>
        </div>
        <div className="sim-data-row">
          <span className="sim-data-label">Eccentricity (e)</span>
          <div className="flex items-baseline gap-1">
            <span className="sim-data-value">{formatNumber(data.eccentricity, 4)}</span>
          </div>
        </div>
        <div className="sim-data-row">
          <span className="sim-data-label">Sim Time</span>
          <div className="flex items-baseline gap-1">
            <span className="sim-data-value">{formatNumber(data.simTime, 1)}</span>
            <span className="sim-data-unit">t</span>
          </div>
        </div>
      </div>
    </div>
  );
}
