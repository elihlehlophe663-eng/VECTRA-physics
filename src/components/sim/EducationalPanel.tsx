import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function EducationalPanel() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="sim-panel">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="sim-panel-header w-full transition-colors hover:bg-surface-hover"
      >
        <span className="sim-panel-title">Understanding Orbits</span>
        {expanded ? (
          <ChevronUp className="ml-auto h-4 w-4 text-star-white/40" strokeWidth={1.5} />
        ) : (
          <ChevronDown className="ml-auto h-4 w-4 text-star-white/40" strokeWidth={1.5} />
        )}
      </button>
      {expanded && (
        <div className="space-y-4 p-4">
          <Section title="Gravity" equation="a = −GM r / |r|³">
            Every body with mass attracts every other body. The acceleration on the test body
            points toward the central mass and weakens with the square of the distance. This
            inverse-square law is what binds planets, moons, and spacecraft.
          </Section>

          <Section title="Orbital Velocity" equation="v_circ = √(GM/r)">
            At any distance, there is a specific speed that produces a perfect circle. Too slow
            and the body falls inward; too fast and it spirals outward. Try the Circular Orbit
            preset to see this exact balance.
          </Section>

          <Section title="Specific Orbital Energy" equation="ε = v²/2 − GM/r">
            Energy determines whether an orbit is bound or unbound. When ε is negative, the body
            lacks the energy to escape — it orbits forever. When ε is zero or positive, the body
            can fly off to infinity.
          </Section>

          <Section title="Eccentricity" equation="e = |(v × h)/μ − r̂|">
            Eccentricity describes the shape of the orbit. e = 0 is a circle, 0 &lt; e &lt; 1 is
            an ellipse, e = 1 is a parabola (the escape boundary), and e &gt; 1 is a hyperbola —
            a flyby that never returns.
          </Section>

          <Section title="Bound vs Unbound">
            Elliptical and circular orbits are bound — the body repeats its path. Parabolic and
            hyperbolic trajectories are unbound — the body escapes the gravitational well. The
            boundary is the escape velocity v_esc = √(2GM/r).
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
