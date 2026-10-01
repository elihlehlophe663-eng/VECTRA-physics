import type { StellarControls } from '@/hooks/useStellarSimulation';
import { SliderInput } from './SliderInput';

interface StellarMassControlProps {
  controls: StellarControls;
}

export function StellarMassControl({ controls }: StellarMassControlProps) {
  const { mass, setMass, path, remnantType } = controls;

  const pathLabel = path === 'high-mass' ? 'HIGH MASS' : 'LOW / SUN-LIKE';
  const remnantLabel = remnantType === 'black-hole' ? 'Black Hole' : remnantType === 'neutron-star' ? 'Neutron Star' : 'White Dwarf';

  return (
    <div className="sim-panel">
      <div className="sim-panel-header">
        <span className="sim-panel-title">Initial Mass</span>
        <span className={`ml-auto font-mono text-xs ${path === 'high-mass' ? 'text-rose-400' : 'text-accent-cyan'}`}>
          {pathLabel}
        </span>
      </div>
      <div className="sim-panel-body">
        <SliderInput
          label="Stellar Mass"
          value={mass}
          min={0.1}
          max={50}
          step={0.1}
          unit="M☉"
          onChange={setMass}
          precision={1}
        />

        {/* Path description */}
        <div className="rounded-lg border border-surface-border bg-space-900/40 p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.7rem] text-star-white/35">Evolution Path</span>
          </div>
          <p className="mt-1 font-body text-xs leading-relaxed text-star-white/50">
            {path === 'high-mass'
              ? 'A massive star burns fast and dies young. It will end in a supernova, leaving behind a neutron star or black hole.'
              : 'A sun-like star burns slowly for billions of years. It will end as a red giant, shedding its outer layers to become a white dwarf.'}
          </p>
          <div className="mt-2 flex items-center gap-2 border-t border-surface-border pt-2">
            <span className="font-mono text-[0.7rem] text-star-white/35">Remnant:</span>
            <span className="font-mono text-xs text-accent-gold">{remnantLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
