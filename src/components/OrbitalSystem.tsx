/**
 * OrbitalSystem — a pure-CSS animated orbital system used as the hero visual.
 * No physics engine; purely decorative. Respects prefers-reduced-motion via
 * the global CSS override in index.css.
 */

interface OrbitConfig {
  size: number;
  duration: number;
  planetSize: number;
  color: string;
  glow: string;
  delay: number;
  hasRing?: boolean;
}

const orbits: OrbitConfig[] = [
  { size: 120, duration: 8, planetSize: 6, color: '#e8c87a', glow: 'rgba(232,200,122,0.4)', delay: 0 },
  { size: 200, duration: 14, planetSize: 8, color: '#5ec8d8', glow: 'rgba(94,200,216,0.4)', delay: -2 },
  { size: 290, duration: 22, planetSize: 10, color: '#a8d5e8', glow: 'rgba(168,213,232,0.35)', delay: -5, hasRing: true },
  { size: 380, duration: 32, planetSize: 7, color: '#f0e0c8', glow: 'rgba(240,224,200,0.3)', delay: -8 },
];

export function OrbitalSystem() {
  return (
    <div
      className="relative flex aspect-square w-full max-w-[480px] items-center justify-center"
      aria-hidden="true"
    >
      {/* Central star */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="absolute h-16 w-16 rounded-full bg-accent-cyan/20 animate-pulse-glow" />
        <div className="absolute h-10 w-10 rounded-full bg-accent-cyan/30 blur-sm" />
        <div className="relative h-5 w-5 rounded-full bg-accent-cyan shadow-[0_0_20px_4px_rgba(94,200,216,0.5)]" />
      </div>

      {/* Orbit rings + planets */}
      {orbits.map((orbit, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-star-white/8"
          style={{
            width: `${orbit.size}px`,
            height: `${orbit.size}px`,
          }}
        >
          {/* Planet wrapper — rotates around center */}
          <div
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{
              animation: `orbit ${orbit.duration}s linear infinite`,
              animationDelay: `${orbit.delay}s`,
            }}
          >
            {/* Planet positioned at orbit edge */}
            <div
              className="absolute flex items-center justify-center rounded-full"
              style={{
                width: `${orbit.planetSize * 2}px`,
                height: `${orbit.planetSize * 2}px`,
                transform: `translate(-50%, -50%) translateX(${orbit.size / 2}px)`,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: `${orbit.planetSize}px`,
                  height: `${orbit.planetSize}px`,
                  backgroundColor: orbit.color,
                  boxShadow: `0 0 ${orbit.planetSize * 2}px ${orbit.glow}`,
                }}
              />
              {/* Ring for the third planet */}
              {orbit.hasRing && (
                <div
                  className="absolute rounded-full border border-star-white/15"
                  style={{
                    width: `${orbit.planetSize * 3.5}px`,
                    height: `${orbit.planetSize * 1.2}px`,
                    transform: 'rotate(-25deg)',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Faint background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,213,232,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,213,232,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
        }}
      />
    </div>
  );
}
