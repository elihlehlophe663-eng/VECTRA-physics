import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useOrbitalSimulation } from '@/hooks/useOrbitalSimulation';
import { DataPanel } from '@/components/sim/DataPanel';
import { ControlPanel } from '@/components/sim/ControlPanel';
import { PlaybackControls } from '@/components/sim/PlaybackControls';
import { PresetButtons } from '@/components/sim/PresetButtons';
import { VisualizationToggles } from '@/components/sim/VisualizationToggles';
import { CameraControls } from '@/components/sim/CameraControls';
import { EducationalPanel } from '@/components/sim/EducationalPanel';

export function OrbitalMechanicsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useOrbitalSimulation(containerRef);

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
        {/*
          Mobile: title → viewport (explicit height) → controls below (page scrolls)
          Desktop: full-height row — viewport (flex-1) + sidebar (360px, internal scroll)
        */}
        <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-3.5rem)]">
          {/* ---- 3D Simulation Viewport ---- */}
          <div
            className="simulation-viewport relative h-[58vh] min-h-[360px] overflow-hidden sm:h-[560px] lg:h-full lg:min-h-0 lg:flex-1"
          >
            {/* Desktop title overlay (hidden on mobile — mobile title is above) */}
            <div className="pointer-events-none absolute left-6 top-6 z-10 hidden lg:block">
              <h1 className="font-display text-2xl font-semibold tracking-wide text-star-white sm:text-3xl">
                ORBITAL MECHANICS
              </h1>
              <p className="mt-1 max-w-md font-body text-sm text-star-white/45 sm:text-base">
                Give a body a push and explore the path that follows.
              </p>
            </div>

            {/* Impact overlay */}
            {controls.playState === 'impact' && (
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                <div className="animate-fade-in flex flex-col items-center gap-2 rounded-2xl border border-red-500/30 bg-space-900/80 px-8 py-6 backdrop-blur-md">
                  <span className="font-display text-2xl font-bold tracking-widest text-red-400">
                    IMPACT
                  </span>
                  <span className="font-mono text-xs text-star-white/40">
                    The test body has collided with the central mass. Press Reset to try again.
                  </span>
                </div>
              </div>
            )}

            {/* WebGL canvas container — fills the viewport */}
            <div
              ref={containerRef}
              className="absolute inset-0 h-full w-full touch-none"
            />

            {/* Bottom-left hint */}
            <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden sm:block">
              <p className="font-mono text-[0.7rem] leading-relaxed text-star-white/25">
                Drag to rotate · Shift+drag to pan · Scroll to zoom
              </p>
            </div>
          </div>

          {/* ---- Control sidebar ---- */}
          <aside className="flex w-full flex-col gap-3 border-t border-surface-border bg-space-800/30 p-3 sm:p-4 lg:h-full lg:w-[360px] lg:flex-none lg:overflow-y-auto lg:border-l lg:border-t-0">
            {/* Mobile title (inside sidebar on mobile, hidden on desktop where it overlays the viewport) */}
            <div className="lg:hidden">
              <h1 className="font-display text-xl font-semibold tracking-wide text-star-white">
                ORBITAL MECHANICS
              </h1>
              <p className="mt-1 font-body text-sm text-star-white/45">
                Give a body a push and explore the path that follows.
              </p>
            </div>

            <PlaybackControls controls={controls} />
            <PresetButtons controls={controls} />
            <DataPanel data={controls.data} />
            <ControlPanel controls={controls} />
            <VisualizationToggles controls={controls} />
            <CameraControls controls={controls} />
            <EducationalPanel />
          </aside>
        </div>
      </div>
    </div>
  );
}
