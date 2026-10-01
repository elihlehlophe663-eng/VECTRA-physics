import { Activity, Grid3x3 } from 'lucide-react';
import type { DoubleSlitControls } from '@/hooks/useDoubleSlitSimulation';

interface DSTogglesProps {
  controls: DoubleSlitControls;
}

interface ToggleRowProps {
  icon: typeof Activity;
  label: string;
  active: boolean;
  onClick: () => void;
}

function ToggleRow({ icon: Icon, label, active, onClick }: ToggleRowProps) {
  return (
    <button onClick={onClick} className={`sim-toggle-btn ${active ? 'active' : ''}`}>
      <span className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
        {label}
      </span>
      <span className={`h-3.5 w-6 rounded-full p-0.5 transition-colors ${active ? 'bg-accent-cyan/30' : 'bg-space-500'}`}>
        <span className={`block h-2.5 w-2.5 rounded-full bg-star-white transition-transform ${active ? 'translate-x-2.5' : ''}`} />
      </span>
    </button>
  );
}

export function DSToggles({ controls }: DSTogglesProps) {
  return (
    <div className="sim-panel">
      <div className="sim-panel-header">
        <span className="sim-panel-title">Visualization</span>
      </div>
      <div className="sim-panel-body">
        <ToggleRow
          icon={Activity}
          label="Probability Distribution"
          active={controls.showProbability}
          onClick={controls.toggleProbability}
        />
        <ToggleRow
          icon={Grid3x3}
          label="Reference Grid"
          active={controls.showGrid}
          onClick={controls.toggleGrid}
        />
      </div>
    </div>
  );
}
