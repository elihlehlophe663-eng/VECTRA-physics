import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function DSEducationalPanel() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="sim-panel">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="sim-panel-header w-full transition-colors hover:bg-surface-hover"
      >
        <span className="sim-panel-title">The Experiment</span>
        {expanded ? (
          <ChevronUp className="ml-auto h-4 w-4 text-star-white/40" strokeWidth={1.5} />
        ) : (
          <ChevronDown className="ml-auto h-4 w-4 text-star-white/40" strokeWidth={1.5} />
        )}
      </button>
      {expanded && (
        <div className="space-y-4 p-4">
          <Section title="Individual Events" >
            Each particle is detected as a single, localized impact on the screen. One
            particle tells you nothing about a pattern — it arrives at a seemingly random
            position. Watch the first few impacts: they appear scattered and unpredictable.
          </Section>

          <Section title="The Pattern Emerges" >
            As hundreds and thousands of particles accumulate, a structured pattern becomes
            visible. This is not a coincidence — the positions are drawn from a probability
            distribution that the quantum world enforces. The pattern is real, but it only
            reveals itself through statistics.
          </Section>

          <Section title="Interference" equation="I ∝ cos²(πd sinθ / λ)">
            In double-slit mode, the probability distribution contains a cos² term —
            interference. Bright fringes appear where the path difference is an integer
            multiple of the wavelength. Dark fringes appear where it is a half-integer
            multiple. Changing the wavelength or slit separation shifts the fringes.
          </Section>

          <Section title="Diffraction Envelope" equation="[sin(β)/β]²">
            Each slit has a finite width, which modulates the interference pattern with a
            diffraction envelope. This envelope determines the overall width of the pattern.
            Wider slits produce a narrower envelope; narrower slits spread it out.
          </Section>

          <Section title="Wave-Particle Duality">
            The deepest mystery: particles arrive one at a time, like bullets, yet the
            accumulated pattern is wave-like, with fringes. Even when particles are sent
            one at a time — ensuring they cannot interfere with each other — the pattern
            still emerges. This reveals that quantum probability itself has wave-like
            structure.
          </Section>

          <Section title="Single vs Double Slit">
            Switch to single-slit mode to see the diffraction pattern alone — a broad
            central maximum with dimmer side lobes. Switch back to double-slit to see how
            interference fringes appear within the diffraction envelope. The difference
            between the two is the heart of the experiment.
          </Section>
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  equation,
  children,
}: {
  title: string;
  equation?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <h4 className="font-display text-sm font-medium text-star-white">{title}</h4>
        {equation && (
          <code className="rounded border border-surface-border bg-space-900/50 px-1.5 py-0.5 font-mono text-[0.7rem] text-accent-ice">
            {equation}
          </code>
        )}
      </div>
      <p className="font-body text-xs leading-relaxed text-star-white/45">{children}</p>
    </div>
  );
}
