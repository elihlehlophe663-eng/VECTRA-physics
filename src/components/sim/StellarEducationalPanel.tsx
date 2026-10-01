import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function StellarEducationalPanel() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="sim-panel">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="sim-panel-header w-full transition-colors hover:bg-surface-hover"
      >
        <span className="sim-panel-title">Stellar Evolution</span>
        {expanded ? (
          <ChevronUp className="ml-auto h-4 w-4 text-star-white/40" strokeWidth={1.5} />
        ) : (
          <ChevronDown className="ml-auto h-4 w-4 text-star-white/40" strokeWidth={1.5} />
        )}
      </button>
      {expanded && (
        <div className="space-y-4 p-4">
          <Section title="A Star Is Born">
            Stars begin their lives in nebulae — vast clouds of hydrogen and helium gas.
            Gravity slowly pulls the gas together, compressing it until the core becomes
            hot and dense enough to ignite nuclear fusion. This marks the birth of a star.
          </Section>

          <Section title="The Main Sequence">
            A star spends most of its life on the main sequence, steadily converting
            hydrogen into helium in its core. This is a stable balance: gravity tries to
            collapse the star, while fusion energy pushes outward. The more massive the
            star, the hotter and brighter it burns — and the faster it runs out of fuel.
          </Section>

          <Section title="Mass Determines Destiny">
            A star's initial mass is the single most important factor in its evolution.
            A star like our Sun will burn for about 10 billion years. A star 25 times
            more massive may live only a few million years. The mass determines not only
            the lifespan but the final fate: white dwarf, neutron star, or black hole.
          </Section>

          <Section title="Low-Mass Stars" equation="0.1–8 M☉">
            Sun-like stars swell into red giants when core hydrogen runs out. They ignite
            helium fusion, then shed their outer layers as a planetary nebula. The exposed
            core — a white dwarf — cools for trillions of years. No explosion, just a
            gentle farewell.
          </Section>

          <Section title="High-Mass Stars" equation="8+ M☉">
            Massive stars fuse elements all the way up to iron. But iron cannot release
            energy through fusion — the chain stops. The core collapses in milliseconds,
            rebounds in a supernova explosion, and leaves behind either a neutron star
            (a ball of neutrons 20 km wide) or, for the most massive stars, a black hole.
          </Section>

          <Section title="Why the Paths Diverge">
            The key is electron degeneracy pressure — the quantum mechanical resistance of
            electrons to being squeezed together. For cores below about 1.4 M☉ (the
            Chandrasekhar limit), this pressure can support the remnant as a white dwarf.
            Above that limit, gravity overwhelms it, leading to further collapse and
            more exotic remnants.
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
