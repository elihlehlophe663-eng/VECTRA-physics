import { useCallback, useEffect, useRef, useState } from 'react';
import { OrbitalEngine } from '@/lib/OrbitalEngine';
import type { OrbitalData, InitialConditions } from '@/lib/orbitalPhysics';
import { presets } from '@/lib/presets';

const DEFAULT_PRESET = presets[0]; // Circular Orbit

export type PlayState = 'playing' | 'paused' | 'impact';

export interface SimulationControls {
  // State
  data: OrbitalData;
  playState: PlayState;
  speed: number;
  // Initial conditions
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  gm: number;
  // Visualization
  trailEnabled: boolean;
  trailLength: number;
  showGrid: boolean;
  showAxes: boolean;
  showPlane: boolean;
  showVelocity: boolean;
  followBody: boolean;
  // Actions
  play: () => void;
  pause: () => void;
  reset: () => void;
  setSpeed: (s: number) => void;
  setPosition: (axis: 'x' | 'y' | 'z', value: number) => void;
  setVelocity: (axis: 'x' | 'y' | 'z', value: number) => void;
  setGm: (value: number) => void;
  applyPreset: (presetId: string) => void;
  setTrailEnabled: (enabled: boolean) => void;
  setTrailLength: (len: number) => void;
  toggleGrid: () => void;
  toggleAxes: () => void;
  togglePlane: () => void;
  toggleVelocity: () => void;
  toggleFollow: () => void;
  resetCamera: () => void;
}

export function useOrbitalSimulation(containerRef: React.RefObject<HTMLDivElement | null>): SimulationControls {
  const engineRef = useRef<OrbitalEngine | null>(null);
  const [playState, setPlayState] = useState<PlayState>('paused');
  const [speed, setSpeedState] = useState(1);
  const [position, setPositionState] = useState({ ...DEFAULT_PRESET.conditions.position });
  const [velocity, setVelocityState] = useState({ ...DEFAULT_PRESET.conditions.velocity });
  const [gm, setGmState] = useState(DEFAULT_PRESET.conditions.gm);
  const [trailEnabled, setTrailEnabledState] = useState(true);
  const [trailLength, setTrailLengthState] = useState(2000);
  const [showGrid, setShowGrid] = useState(false);
  const [showAxes, setShowAxes] = useState(false);
  const [showPlane, setShowPlane] = useState(false);
  const [showVelocity, setShowVelocity] = useState(true);
  const [followBody, setFollowBody] = useState(false);

  const [data, setData] = useState<OrbitalData>({
    distance: 15,
    speed: 0,
    acceleration: 0,
    specificEnergy: 0,
    angularMomentum: null as unknown as import('three').Vector3,
    angularMomentumMag: 0,
    eccentricity: 0,
    classification: 'Circular',
    simTime: 0,
  });

  // Initialize engine
  useEffect(() => {
    if (!containerRef.current) return;

    const engine = new OrbitalEngine(
      containerRef.current,
      DEFAULT_PRESET.conditions,
      {
        onDataUpdate: (d) => setData(d),
        onCollision: () => setPlayState('impact'),
      }
    );
    engineRef.current = engine;

    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, [containerRef]);

  const play = useCallback(() => {
    engineRef.current?.play();
    setPlayState('playing');
  }, []);

  const pause = useCallback(() => {
    engineRef.current?.pause();
    setPlayState('paused');
  }, []);

  const reset = useCallback(() => {
    engineRef.current?.reset();
    setPlayState('paused');
  }, []);

  const setSpeed = useCallback((s: number) => {
    engineRef.current?.setSpeed(s);
    setSpeedState(s);
  }, []);

  const applyInitialConditions = useCallback((ic: InitialConditions) => {
    engineRef.current?.setInitialConditions(ic);
    setPositionState({ ...ic.position });
    setVelocityState({ ...ic.velocity });
    setGmState(ic.gm);
    setPlayState('paused');
  }, []);

  const setPosition = useCallback((axis: 'x' | 'y' | 'z', value: number) => {
    setPositionState((prev) => {
      const newPos = { ...prev, [axis]: value };
      applyInitialConditions({
        position: newPos,
        velocity,
        gm,
      });
      return newPos;
    });
  }, [applyInitialConditions, velocity, gm]);

  const setVelocity = useCallback((axis: 'x' | 'y' | 'z', value: number) => {
    setVelocityState((prev) => {
      const newVel = { ...prev, [axis]: value };
      applyInitialConditions({
        position,
        velocity: newVel,
        gm,
      });
      return newVel;
    });
  }, [applyInitialConditions, position, gm]);

  const setGm = useCallback((value: number) => {
    setGmState(value);
    applyInitialConditions({ position, velocity, gm: value });
  }, [applyInitialConditions, position, velocity]);

  const applyPreset = useCallback((presetId: string) => {
    const preset = presets.find((p) => p.id === presetId);
    if (preset) {
      applyInitialConditions(preset.conditions);
    }
  }, [applyInitialConditions]);

  const setTrailEnabledCb = useCallback((enabled: boolean) => {
    engineRef.current?.setTrailEnabled(enabled);
    setTrailEnabledState(enabled);
  }, []);

  const setTrailLengthCb = useCallback((len: number) => {
    engineRef.current?.setTrailLength(len);
    setTrailLengthState(len);
  }, []);

  const toggleGrid = useCallback(() => {
    setShowGrid((prev) => {
      const next = !prev;
      engineRef.current?.setGridVisible(next);
      return next;
    });
  }, []);

  const toggleAxes = useCallback(() => {
    setShowAxes((prev) => {
      const next = !prev;
      engineRef.current?.setAxesVisible(next);
      return next;
    });
  }, []);

  const togglePlane = useCallback(() => {
    setShowPlane((prev) => {
      const next = !prev;
      engineRef.current?.setPlaneVisible(next);
      return next;
    });
  }, []);

  const toggleVelocity = useCallback(() => {
    setShowVelocity((prev) => {
      const next = !prev;
      engineRef.current?.setVelocityVisible(next);
      return next;
    });
  }, []);

  const toggleFollow = useCallback(() => {
    setFollowBody((prev) => {
      const next = !prev;
      engineRef.current?.setFollowBody(next);
      return next;
    });
  }, []);

  const resetCamera = useCallback(() => {
    engineRef.current?.resetCamera();
  }, []);

  return {
    data,
    playState,
    speed,
    position,
    velocity,
    gm,
    trailEnabled,
    trailLength,
    showGrid,
    showAxes,
    showPlane,
    showVelocity,
    followBody,
    play,
    pause,
    reset,
    setSpeed,
    setPosition,
    setVelocity,
    setGm,
    applyPreset,
    setTrailEnabled: setTrailEnabledCb,
    setTrailLength: setTrailLengthCb,
    toggleGrid,
    toggleAxes,
    togglePlane,
    toggleVelocity,
    toggleFollow,
    resetCamera,
  };
}
