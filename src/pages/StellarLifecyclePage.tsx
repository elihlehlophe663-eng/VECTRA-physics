import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStellarSimulation } from '@/hooks/useStellarSimulation';
import { StellarPlayback } from '@/components/sim/StellarPlayback';
import { StellarTimeline } from '@/components/sim/StellarTimeline';
import { StellarStageInfo } from '@/components/sim/StellarStageInfo';
import { StellarMassControl } from '@/components/sim/StellarMassControl';
import { StellarEducationalPanel } from '@/components/sim/StellarEducationalPanel';

export function StellarLifecyclePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useStellarSimulation(containerRef);

  return (
    <div className="min-h-screen bg-space-900">
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-surface-border bg-space-900/85 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <Link
            to="/"
            className="group flex items-center gap-2 font-display text-sm text-star-white/55 transition-colors hover:text-star-white"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.5}
            />
            <span className="hidden sm:inline">Back to Simulations</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <circle cx="14" cy="14" r="3" fill="#5ec8d8" />
              <ellipse cx="14" cy="14" rx="11" ry="4.5" stroke="#a8d5e8" strokeOpacity="0.35" strokeWidth="1" transform="rotate(-20 14 14)" />
              <circle cx="24" cy="9" r="1.2" fill="#a8d5e8" />
            </svg>
            <span className="font-display text-sm font-semibold tracking-wider text-star-white">
              VECTRA
            </span>
          </div>
        </div>
      </header>

      {/* Content — offset for fixed header */}
      <div className="pt-14">
        <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-3.5rem)]">
          {/* ---- 3D Simulation Viewport ---- */}
          <div className="simulation-viewport relative h-[58vh] min-h-[360px] overflow-hidden sm:h-[560px] lg:h-full lg:min-h-0 lg:flex-1">
            {/* Desktop title overlay */}
            <div className="pointer-events-none absolute left-6 top-6 z-10 hidden lg:block">
              <h1 className="font-display text-2xl font-semibold tracking-wide text-star-white sm:text-3xl">
                STELLAR LIFE CYCLE
              </h1>
              <p className="mt-1 max-w-md font-body text-sm text-star-white/45 sm:text-base">
                Trace a star from birth to death. Its initial mass decides its fate.
              </p>
            </div>

            {/* Current stage name overlay */}
            {controls.currentStage && (
              <div className="pointer-events-none absolute bottom-4 left-4 z-10">
                <span className="font-mono text-xs text-star-white/40">
                  STAGE {controls.currentStageIndex + 1}:{' '}
                  <span className="text-accent-cyan">{controls.currentStage.name}</span>
                </span>
              </div>
            )}

            {/* WebGL canvas container — fills the viewport */}
            <div
              ref={containerRef}
              className="absolute inset-0 h-full w-full touch-none"
            />

            {/* Bottom-right hint */}
            <div className="pointer-events-none absolute bottom-4 right-4 z-10 hidden sm:block">
              <p className="font-mono text-[0.7rem] leading-relaxed text-star-white/25">
                Drag to rotate · Shift+drag to pan · Scroll to zoom
              </p>
            </div>
          </div>

          {/* ---- Control sidebar ---- */}
          <aside className="flex w-full flex-col gap-3 border-t border-surface-border bg-space-800/30 p-3 sm:p-4 lg:h-full lg:w-[360px] lg:flex-none lg:overflow-y-auto lg:border-l lg:border-t-0">
            {/* Mobile title */}
            <div className="lg:hidden">
              <h1 className="font-display text-xl font-semibold tracking-wide text-star-white">
                STELLAR LIFE CYCLE
              </h1>
              <p className="mt-1 font-body text-sm text-star-white/45">
                Trace a star from birth to death. Its initial mass decides its fate.
              </p>
            </div>

            <StellarPlayback controls={controls} />
            <StellarMassControl controls={controls} />
            <StellarTimeline controls={controls} />
            <StellarStageInfo stage={controls.currentStage} />
            <StellarEducationalPanel />
          </aside>
        </div>
      </div>
    </div>
  );
}
