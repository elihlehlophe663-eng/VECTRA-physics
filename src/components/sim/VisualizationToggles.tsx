import { Grid3x3, Crosshair, Orbit, ArrowRight, Footprints, Activity } from 'lucide-react';
import type { SimulationControls } from '@/hooks/useOrbitalSimulation';
import { SliderInput } from './SliderInput';

interface VisualizationTogglesProps {
  controls: SimulationControls;
}

interface ToggleRowProps {
  icon: typeof Grid3x3;
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

export function VisualizationToggles({ controls }: VisualizationTogglesProps) {
  return (
    <div className="sim-panel">
      <div className="sim-panel-header">
        <span className="sim-panel-title">Visualization</span>
      </div>
      <div className="sim-panel-body">
        <ToggleRow
          icon={Activity}
          label="Trail"
          active={controls.trailEnabled}
          onClick={() => controls.setTrailEnabled(!controls.trailEnabled)}
        />
        {controls.trailEnabled && (
          <div className="pl-1">
            <SliderInput
              label="Trail Length"
              value={controls.trailLength}
              min={200}
              max={5000}
              step={100}
              unit=""
              onChange={controls.setTrailLength}
              precision={0}
            />
          </div>
        )}
        <ToggleRow
          icon={Orbit}
          label="Orbital Plane"
          active={controls.showPlane}
          onClick={controls.togglePlane}
        />
        <ToggleRow
          icon={Grid3x3}
          label="Reference Grid"
          active={controls.showGrid}
          onClick={controls.toggleGrid}
        />
        <ToggleRow
          icon={Crosshair}
          label="XYZ Axes"
          active={controls.showAxes}
          onClick={controls.toggleAxes}
        />
        <ToggleRow
          icon={ArrowRight}
          label="Velocity Vector"
          active={controls.showVelocity}
          onClick={controls.toggleVelocity}
        />
        <ToggleRow
          icon={Footprints}
          label="Follow Body"
          active={controls.followBody}
          onClick={controls.toggleFollow}
        />
      </div>
    </div>
  );
}
