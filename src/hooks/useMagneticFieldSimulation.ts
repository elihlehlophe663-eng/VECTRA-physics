import { useCallback, useEffect, useRef, useState } from 'react';
import { MagneticFieldEngine, type VizMode } from '@/lib/MagneticFieldEngine';
import type { MagnetParameters, ProbeData } from '@/lib/magneticFieldPhysics';
import { DEFAULT_MAGNET_PARAMS } from '@/lib/magneticFieldPhysics';

export interface MagneticFieldControls {
  // Parameters
  params: MagnetParameters;
  // Playback
  isPlaying: boolean;
  speed: number;
  // Visualization
  vizMode: VizMode;
  showFieldDirection: boolean;
  showFieldStrength: boolean;
  // Probe
  probeData: ProbeData | null;
  // Actions
  togglePlay: () => void;
  reset: () => void;
  setSpeed: (s: number) => void;
  setStrength: (v: number) => void;
  setOrientation: (v: number) => void;
  setLineDensity: (v: number) => void;
  setParticleSpeed: (v: number) => void;
  setVizScale: (v: number) => void;
  setVizMode: (m: VizMode) => void;
  toggleFieldDirection: () => void;
  toggleFieldStrength: () => void;
  resetCamera: () => void;
}

export function useMagneticFieldSimulation(
  containerRef: React.RefObject<HTMLDivElement | null>
): MagneticFieldControls {
  const engineRef = useRef<MagneticFieldEngine | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeedState] = useState(1);
  const [params, setParams] = useState<MagnetParameters>({ ...DEFAULT_MAGNET_PARAMS });
  const [vizMode, setVizModeState] = useState<VizMode>('lines');
  const [showFieldDirection, setShowFieldDirection] = useState(true);
  const [showFieldStrength, setShowFieldStrength] = useState(false);
  const [probeData, setProbeData] = useState<ProbeData | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const engine = new MagneticFieldEngine(
      containerRef.current,
      { ...DEFAULT_MAGNET_PARAMS },
      { onProbeUpdate: (d) => setProbeData(d) }
    );
    engineRef.current = engine;

    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, [containerRef]);

  const togglePlay = useCallback(() => {
    setIsPlaying((v) => {
      const next = !v;
      if (next) engineRef.current?.play();
      else engineRef.current?.pause();
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    engineRef.current?.reset();
    setParams({ ...DEFAULT_MAGNET_PARAMS });
    setIsPlaying(true);
    setSpeedState(1);
    setVizModeState('lines');
    setShowFieldDirection(true);
    setShowFieldStrength(false);
  }, []);

  const setSpeed = useCallback((s: number) => {
    engineRef.current?.setSpeed(s);
    setSpeedState(s);
  }, []);

  const setStrength = useCallback((v: number) => {
    setParams((p) => ({ ...p, strength: v }));
    engineRef.current?.setStrength(v);
  }, []);

  const setOrientation = useCallback((v: number) => {
    setParams((p) => ({ ...p, orientation: v }));
    engineRef.current?.setOrientation(v);
  }, []);

  const setLineDensity = useCallback((v: number) => {
    setParams((p) => ({ ...p, lineDensity: v }));
    engineRef.current?.setLineDensity(v);
  }, []);

  const setParticleSpeed = useCallback((v: number) => {
    setParams((p) => ({ ...p, particleSpeed: v }));
    engineRef.current?.setParticleSpeed(v);
  }, []);

  const setVizScale = useCallback((v: number) => {
    setParams((p) => ({ ...p, vizScale: v }));
    engineRef.current?.setVizScale(v);
  }, []);

  const setVizMode = useCallback((m: VizMode) => {
    setVizModeState(m);
    engineRef.current?.setVizMode(m);
  }, []);

  const toggleFieldDirection = useCallback(() => {
    setShowFieldDirection((v) => {
      const next = !v;
      engineRef.current?.setShowFieldDirection(next);
      return next;
    });
  }, []);

  const toggleFieldStrength = useCallback(() => {
    setShowFieldStrength((v) => {
      const next = !v;
      engineRef.current?.setShowFieldStrength(next);
      return next;
    });
  }, []);

  const resetCamera = useCallback(() => {
    engineRef.current?.resetCamera();
  }, []);

  return {
    params,
    isPlaying,
    speed,
    vizMode,
    showFieldDirection,
    showFieldStrength,
    probeData,
    togglePlay,
    reset,
    setSpeed,
    setStrength,
    setOrientation,
    setLineDensity,
    setParticleSpeed,
    setVizScale,
    setVizMode,
    toggleFieldDirection,
    toggleFieldStrength,
    resetCamera,
  };
}
