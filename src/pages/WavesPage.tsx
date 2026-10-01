import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useWaveSimulation } from '@/hooks/useWaveSimulation';
import { useWaveCanvas } from '@/hooks/useWaveCanvas';
import { WavePlayback } from '@/components/sim/WavePlayback';
import { WavePresetButtons } from '@/components/sim/WavePresetButtons';
import { WaveDataPanel } from '@/components/sim/WaveDataPanel';
import { WaveControlPanel } from '@/components/sim/WaveControlPanel';
import { WaveVisualizationToggles } from '@/components/sim/WaveVisualizationToggles';
import { WaveEducationalPanel } from '@/components/sim/WaveEducationalPanel';

export function WavesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useWaveSimulation();

  const canvasRef = useWaveCanvas(containerRef, {
    params: controls.params,
    derived: controls.derived,
    isPlaying: controls.isPlaying,
    speedMultiplier: controls.speed,
    showMeasurements: controls.showMeasurements,
    showGrid: controls.showGrid,
    showEquilibrium: controls.showEquilibrium,
  });

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
          {/* ---- Wave Visualization Viewport ---- */}
          <div className="simulation-viewport relative h-[52vh] min-h-[320px] overflow-hidden sm:h-[520px] lg:h-full lg:min-h-0 lg:flex-1">
            {/* Desktop title overlay */}
            <div className="pointer-events-none absolute left-6 top-6 z-10 hidden lg:block">
              <h1 className="font-display text-2xl font-semibold tracking-wide text-star-white sm:text-3xl">
                WAVES
              </h1>
              <p className="mt-1 max-w-md font-body text-sm text-star-white/45 sm:text-base">
                Explore how wavelength, frequency, amplitude and wave speed shape a wave.
              </p>
            </div>

            {/* Canvas container — fills the viewport */}
            <div
              ref={containerRef}
              className="absolute inset-0 h-full w-full"
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 block h-full w-full"
              />
            </div>
          </div>

          {/* ---- Control sidebar ---- */}
          <aside className="flex w-full flex-col gap-3 border-t border-surface-border bg-space-800/30 p-3 sm:p-4 lg:h-full lg:w-[360px] lg:flex-none lg:overflow-y-auto lg:border-l lg:border-t-0">
            {/* Mobile title */}
            <div className="lg:hidden">
              <h1 className="font-display text-xl font-semibold tracking-wide text-star-white">
                WAVES
              </h1>
              <p className="mt-1 font-body text-sm text-star-white/45">
                Explore how wavelength, frequency, amplitude and wave speed shape a wave.
              </p>
            </div>

            <WavePlayback controls={controls} />
            <WavePresetButtons controls={controls} />
            <WaveDataPanel params={controls.params} derived={controls.derived} />
            <WaveControlPanel controls={controls} />
            <WaveVisualizationToggles controls={controls} />
            <WaveEducationalPanel />
          </aside>
        </div>
      </div>
    </div>
  );
}
