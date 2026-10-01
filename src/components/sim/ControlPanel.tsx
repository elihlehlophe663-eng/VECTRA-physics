import type { SimulationControls } from '@/hooks/useOrbitalSimulation';
import { SliderInput } from './SliderInput';

interface ControlPanelProps {
  controls: SimulationControls;
}

export function ControlPanel({ controls }: ControlPanelProps) {
  const { position, velocity, gm, setPosition, setVelocity, setGm } = controls;

  return (
    <div className="sim-panel">
      <div className="sim-panel-header">
        <span className="sim-panel-title">Initial Conditions</span>
      </div>
      <div className="sim-panel-body">
        {/* Position */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[0.7rem] uppercase tracking-widest-2 text-star-white/30">
            Position
          </span>
          <SliderInput label="X" value={position.x} min={-50} max={50} step={0.5} unit="" onChange={(v) => setPosition('x', v)} precision={1} />
          <SliderInput label="Y" value={position.y} min={-50} max={50} step={0.5} unit="" onChange={(v) => setPosition('y', v)} precision={1} />
          <SliderInput label="Z" value={position.z} min={-50} max={50} step={0.5} unit="" onChange={(v) => setPosition('z', v)} precision={1} />
        </div>

        <div className="h-px bg-surface-border" />

        {/* Velocity */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[0.7rem] uppercase tracking-widest-2 text-star-white/30">
            Velocity
          </span>
          <SliderInput label="VX" value={velocity.x} min={-20} max={20} step={0.1} unit="" onChange={(v) => setVelocity('x', v)} precision={2} />
          <SliderInput label="VY" value={velocity.y} min={-20} max={20} step={0.1} unit="" onChange={(v) => setVelocity('y', v)} precision={2} />
          <SliderInput label="VZ" value={velocity.z} min={-20} max={20} step={0.1} unit="" onChange={(v) => setVelocity('z', v)} precision={2} />
        </div>

        <div className="h-px bg-surface-border" />

        {/* Central Mass */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[0.7rem] uppercase tracking-widest-2 text-star-white/30">
            Central Mass (GM)
          </span>
          <SliderInput label="GM" value={gm} min={100} max={5000} step={50} unit="" onChange={setGm} precision={0} />
        </div>
      </div>
    </div>
  );
}
