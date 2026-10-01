import type { InitialConditions } from './orbitalPhysics';
import { circularVelocity, escapeVelocity } from './orbitalPhysics';

export interface Preset {
  id: string;
  label: string;
  description: string;
  conditions: InitialConditions;
}

/**
 * All presets use GM=1000, central radius=3, starting at (15, 0, 0).
 * They differ only in initial velocity, producing physically distinct orbits.
 */
const GM = 1000;
const R0 = 15;

const vCirc = circularVelocity(GM, R0);

export const presets: Preset[] = [
  {
    id: 'circular',
    label: 'Circular Orbit',
    description: 'Velocity equals the circular orbit speed. Eccentricity ≈ 0.',
    conditions: {
      position: { x: R0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: vCirc },
      gm: GM,
    },
  },
  {
    id: 'elliptical',
    label: 'Elliptical Orbit',
    description: 'Velocity below escape but above circular. A stable ellipse.',
    conditions: {
      position: { x: R0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: vCirc * 0.78 },
      gm: GM,
    },
  },
  {
    id: 'high-ecc',
    label: 'High Eccentricity',
    description: 'A slow initial push creates a highly elongated orbit.',
    conditions: {
      position: { x: R0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: vCirc * 0.42 },
      gm: GM,
    },
  },
  {
    id: 'escape',
    label: 'Escape Trajectory',
    description: 'Velocity exceeds escape velocity. The body never returns.',
    conditions: {
      position: { x: R0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: escapeVelocity(GM, R0) * 1.1 },
      gm: GM,
    },
  },
  {
    id: 'close-pass',
    label: 'Close Pass',
    description: 'A fast, angled trajectory that swings close to the central body.',
    conditions: {
      position: { x: 25, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: escapeVelocity(GM, 25) * 0.85 },
      gm: GM,
    },
  },
];
