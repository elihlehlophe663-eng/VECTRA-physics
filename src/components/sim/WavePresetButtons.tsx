import { wavePresets } from '@/lib/wavePhysics';
import type { WaveSimulationControls } from '@/hooks/useWaveSimulation';

interface WavePresetButtonsProps {
  controls: WaveSimulationControls;
}

export function WavePresetButtons({ controls }: WavePresetButtonsProps) {
  return (
    <div className="sim-panel">
      <div className="sim-panel-header">
        <span className="sim-panel-title">Presets</span>
      </div>
      <div className="sim-panel-body">
        <div className="grid grid-cols-1 gap-1.5">
          {wavePresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => controls.applyPreset(preset.id)}
              className="sim-preset-btn"
            >
              <span className="block font-medium">{preset.label}</span>
              <span className="mt-0.5 block text-[0.7rem] font-normal text-star-white/35">
                {preset.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
