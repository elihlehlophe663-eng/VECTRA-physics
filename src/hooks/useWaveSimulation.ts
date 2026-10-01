import { useCallback, useMemo, useState } from 'react';
import {
  type WaveParameters,
  type WaveDerivedData,
  DEFAULT_WAVE_PARAMS,
  deriveWaveData,
  wavePresets,
} from '@/lib/wavePhysics';

export interface WaveSimulationControls {
  // Parameters
  params: WaveParameters;
  derived: WaveDerivedData;
  // Playback
  isPlaying: boolean;
  speed: number;
  // Visualization toggles
  showMeasurements: boolean;
  showGrid: boolean;
  showEquilibrium: boolean;
  // Actions
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  reset: () => void;
  setSpeed: (s: number) => void;
  setAmplitude: (v: number) => void;
  setWavelength: (v: number) => void;
  setFrequency: (v: number) => void;
  setPhase: (v: number) => void;
  setDirection: (d: 1 | -1) => void;
  applyPreset: (id: string) => void;
  toggleMeasurements: () => void;
  toggleGrid: () => void;
  toggleEquilibrium: () => void;
}

export function useWaveSimulation(): WaveSimulationControls {
  const [params, setParams] = useState<WaveParameters>({ ...DEFAULT_WAVE_PARAMS });
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeedState] = useState(1);
  const [showMeasurements, setShowMeasurements] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [showEquilibrium, setShowEquilibrium] = useState(true);

  const derived = useMemo(() => deriveWaveData(params), [params]);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const togglePlay = useCallback(() => setIsPlaying((v) => !v), []);

  const reset = useCallback(() => {
    setParams({ ...DEFAULT_WAVE_PARAMS });
    setIsPlaying(true);
    setSpeedState(1);
    setShowMeasurements(true);
    setShowGrid(false);
    setShowEquilibrium(true);
  }, []);

  const setSpeed = useCallback((s: number) => setSpeedState(s), []);

  const setAmplitude = useCallback((v: number) => {
    setParams((p) => ({ ...p, amplitude: Math.max(5, Math.min(120, v)) }));
  }, []);

  const setWavelength = useCallback((v: number) => {
    setParams((p) => ({ ...p, wavelength: Math.max(40, Math.min(600, v)) }));
  }, []);

  const setFrequency = useCallback((v: number) => {
    setParams((p) => ({ ...p, frequency: Math.max(0.1, Math.min(5, v)) }));
  }, []);

  const setPhase = useCallback((v: number) => {
    setParams((p) => ({ ...p, phase: v }));
  }, []);

  const setDirection = useCallback((d: 1 | -1) => {
    setParams((p) => ({ ...p, direction: d }));
  }, []);

  const applyPreset = useCallback((id: string) => {
    const preset = wavePresets.find((p) => p.id === id);
    if (preset) {
      setParams({ ...preset.params });
    }
  }, []);

  const toggleMeasurements = useCallback(() => setShowMeasurements((v) => !v), []);
  const toggleGrid = useCallback(() => setShowGrid((v) => !v), []);
  const toggleEquilibrium = useCallback(() => setShowEquilibrium((v) => !v), []);

  return {
    params,
    derived,
    isPlaying,
    speed,
    showMeasurements,
    showGrid,
    showEquilibrium,
    play,
    pause,
    togglePlay,
    reset,
    setSpeed,
    setAmplitude,
    setWavelength,
    setFrequency,
    setPhase,
    setDirection,
    applyPreset,
    toggleMeasurements,
    toggleGrid,
    toggleEquilibrium,
  };
}
