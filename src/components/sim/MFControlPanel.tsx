import type { MagneticFieldControls } from '@/hooks/useMagneticFieldSimulation';
import { SliderInput } from './SliderInput';

interface MFControlPanelProps {
  controls: MagneticFieldControls;
}

export function MFControlPanel({ controls }: MFControlPanelProps) {
  const { params, setStrength, setOrientation, setLineDensity, setParticleSpeed, setVizScale } =
    controls;

  return (
    <div className="sim-panel">
      <div className="sim-panel-header">
        <span className="sim-panel-title">Parameters</span>
      </div>
      <div className="sim-panel-body">
        <SliderInput
          label="Field Strength"
          value={params.strength}
          min={10}
          max={300}
          step={5}
          unit=""
          onChange={setStrength}
          precision={0}
        />
        <SliderInput
          label="Magnet Orientation"
          value={params.orientation}
          min={0}
          max={360}
          step={5}
          unit="°"
          onChange={setOrientation}
          precision={0}
        />
        <SliderInput
          label="Field-Line Density"
          value={params.lineDensity}
          min={4}
          max={24}
          step={1}
          unit=""
          onChange={setLineDensity}
          precision={0}
        />
        <SliderInput
          label="Particle Flow Speed"
          value={params.particleSpeed}
          min={0}
          max={5}
          step={0.1}
          unit="×"
          onChange={setParticleSpeed}
          precision={1}
        />
        <SliderInput
          label="Visualization Scale"
          value={params.vizScale}
          min={0.5}
          max={2}
          step={0.1}
          unit="×"
          onChange={setVizScale}
          precision={1}
        />
      </div>
    </div>
  );
}
