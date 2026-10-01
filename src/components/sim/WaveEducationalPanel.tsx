import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function WaveEducationalPanel() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="sim-panel">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="sim-panel-header w-full transition-colors hover:bg-surface-hover"
      >
        <span className="sim-panel-title">Understanding Waves</span>
        {expanded ? (
          <ChevronUp className="ml-auto h-4 w-4 text-star-white/40" strokeWidth={1.5} />
        ) : (
          <ChevronDown className="ml-auto h-4 w-4 text-star-white/40" strokeWidth={1.5} />
        )}
      </button>
      {expanded && (
        <div className="space-y-4 p-4">
          <Section title="The Travelling Wave" equation="y(x, t) = A sin(kx − ωt)">
            A wave is a disturbance that travels through space. At any position x and time t,
            the displacement y is given by a sinusoidal function. The wave moves because the
            phase (kx − ωt) shifts as time advances, carrying the pattern forward.
          </Section>

          <Section title="Amplitude" equation="A">
            The amplitude is the maximum displacement from equilibrium — how tall the crests
            and how deep the troughs. A larger amplitude means more energy in the wave. Adjust
            the amplitude slider to see the wave grow and shrink.
          </Section>

          <Section title="Wavelength" equation="λ — k = 2π/λ">
            The wavelength is the distance between two successive crests. A short wavelength
            produces a tight, choppy wave; a long wavelength produces broad, gentle swells.
            The wave number k relates to wavelength as k = 2π/λ.
          </Section>

          <Section title="Frequency & Period" equation="f — T = 1/f — ω = 2πf">
            Frequency is how many oscillations occur per second. The period T is its inverse:
            the time for one complete cycle. Angular frequency ω = 2πf is the rate of phase
            change in radians per second.
          </Section>

          <Section title="Wave Speed" equation="v = fλ">
            The wave speed — how fast the disturbance propagates — is determined by frequency
            times wavelength. This is not an independent parameter: if you double the
            wavelength while keeping frequency constant, the wave moves twice as fast. Try it
            and watch the wave race across the screen.
          </Section>

          <Section title="Direction">
            Flipping the sign of the time term changes the propagation direction. With
            (kx − ωt) the wave moves right; with (kx + ωt) it moves left. Toggle the direction
            control to see the wave reverse instantly.
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
