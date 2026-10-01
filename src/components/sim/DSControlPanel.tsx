import type { DoubleSlitControls } from '@/hooks/useDoubleSlitSimulation';
import { SliderInput } from './SliderInput';

interface DSControlPanelProps {
  controls: DoubleSlitControls;
}

export function DSControlPanel({ controls }: DSControlPanelProps) {
  const { params, setWavelength, setSlitSeparation, setSlitWidth, setScreenDistance, setEmissionRate } =
    controls;

  return (
    <div className="sim-panel">
      <div className="sim-panel-header">
        <span className="sim-panel-title">Parameters</span>
      </div>
      <div className="sim-panel-body">
        <SliderInput
          label="Wavelength (λ)"
          value={params.wavelength}
          min={1}
          max={100}
          step={1}
          unit=""
          onChange={setWavelength}
          precision={0}
        />
        <SliderInput
          label="Slit Separation (d)"
          value={params.slitSeparation}
          min={10}
          max={200}
          step={2}
          unit=""
          onChange={setSlitSeparation}
          precision={0}
        />
        <SliderInput
          label="Slit Width (a)"
          value={params.slitWidth}
          min={2}
          max={60}
          step={1}
          unit=""
          onChange={setSlitWidth}
          precision={0}
        />
        <SliderInput
          label="Screen Distance (L)"
          value={params.screenDistance}
          min={50}
          max={500}
          step={10}
          unit=""
          onChange={setScreenDistance}
          precision={0}
        />
        <SliderInput
          label="Emission Rate"
          value={params.emissionRate}
          min={1}
          max={200}
          step={1}
          unit="/s"
          onChange={setEmissionRate}
          precision={0}
        />

        {/* Particle type */}
        <div className="h-px bg-surface-border" />

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs text-star-white/45">Particle Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => controls.setParticleType('photon')}
              className={`flex-1 rounded-lg border px-3 py-2 font-mono text-xs transition-all ${
                controls.particleType === 'photon'
                  ? 'border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan'
                  : 'border-surface-border bg-space-700/30 text-star-white/40 hover:text-star-white'
              }`}
            >
              Photon
            </button>
            <button
              onClick={() => controls.setParticleType('electron')}
              className={`flex-1 rounded-lg border px-3 py-2 font-mono text-xs transition-all ${
                controls.particleType === 'electron'
                  ? 'border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan'
                  : 'border-surface-border bg-space-700/30 text-star-white/40 hover:text-star-white'
              }`}
            >
              Electron
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
