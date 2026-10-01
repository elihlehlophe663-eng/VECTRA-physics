import * as THREE from 'three';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface PhysicsState {
  position: Vec3;
  velocity: Vec3;
}

export interface OrbitalData {
  distance: number;
  speed: number;
  acceleration: number;
  specificEnergy: number;
  angularMomentum: THREE.Vector3;
  angularMomentumMag: number;
  eccentricity: number;
  classification: OrbitClassification;
  simTime: number;
}

export type OrbitClassification =
  | 'Circular'
  | 'Elliptical'
  | 'Parabolic'
  | 'Hyperbolic'
  | 'Collision';

export interface SimulationConfig {
  gm: number;
  centralRadius: number;
}

export interface InitialConditions {
  position: Vec3;
  velocity: Vec3;
  gm: number;
}

export const DEFAULT_CONFIG: SimulationConfig = {
  gm: 1000,
  centralRadius: 3,
};

const EPS = 1e-10;

function toTHREE(v: Vec3): THREE.Vector3 {
  return new THREE.Vector3(v.x, v.y, v.z);
}

function fromTHREE(v: THREE.Vector3): Vec3 {
  return { x: v.x, y: v.y, z: v.z };
}

/**
 * Compute gravitational acceleration on the test body from the central mass.
 * a = -GM * r / |r|^3
 */
export function computeAcceleration(pos: Vec3, gm: number): Vec3 {
  const r = toTHREE(pos);
  const dist = r.length();
  if (dist < EPS) {
    return { x: 0, y: 0, z: 0 };
  }
  const factor = -gm / (dist * dist * dist);
  return fromTHREE(r.multiplyScalar(factor));
}

/**
 * RK4 integrator for a single sub-step.
 * Advances position and velocity using gravitational acceleration.
 */
export function rk4Step(
  state: PhysicsState,
  gm: number,
  dt: number
): PhysicsState {
  const pos = toTHREE(state.position);
  const vel = toTHREE(state.velocity);

  const a1 = toTHREE(computeAcceleration(state.position, gm));
  const k1p = vel.clone();
  const k1v = a1;

  const s2p = pos.clone().addScaledVector(k1p, dt / 2);
  const s2v = vel.clone().addScaledVector(k1v, dt / 2);
  const a2 = toTHREE(computeAcceleration(fromTHREE(s2p), gm));
  const k2p = s2v;
  const k2v = a2;

  const s3p = pos.clone().addScaledVector(k2p, dt / 2);
  const s3v = vel.clone().addScaledVector(k2v, dt / 2);
  const a3 = toTHREE(computeAcceleration(fromTHREE(s3p), gm));
  const k3p = s3v;
  const k3v = a3;

  const s4p = pos.clone().addScaledVector(k3p, dt);
  const s4v = vel.clone().addScaledVector(k3v, dt);
  const a4 = toTHREE(computeAcceleration(fromTHREE(s4p), gm));
  const k4p = s4v;
  const k4v = a4;

  const newPos = pos
    .clone()
    .addScaledVector(k1p, dt / 6)
    .addScaledVector(k2p, dt / 3)
    .addScaledVector(k3p, dt / 3)
    .addScaledVector(k4p, dt / 6);

  const newVel = vel
    .clone()
    .addScaledVector(k1v, dt / 6)
    .addScaledVector(k2v, dt / 3)
    .addScaledVector(k3v, dt / 3)
    .addScaledVector(k4v, dt / 6);

  return {
    position: fromTHREE(newPos),
    velocity: fromTHREE(newVel),
  };
}

/**
 * Derive full orbital parameters from the current state.
 * Uses the eccentricity vector: e_vec = (v x h)/mu - r_hat
 * Classification is derived from specific energy and eccentricity.
 */
export function computeOrbitalData(
  state: PhysicsState,
  gm: number,
  simTime: number,
  centralRadius: number
): OrbitalData {
  const r = toTHREE(state.position);
  const v = toTHREE(state.velocity);
  const dist = r.length();
  const speed = v.length();

  if (dist < EPS) {
    return {
      distance: 0,
      speed: 0,
      acceleration: 0,
      specificEnergy: -Infinity,
      angularMomentum: new THREE.Vector3(),
      angularMomentumMag: 0,
      eccentricity: 0,
      classification: 'Collision',
      simTime,
    };
  }

  const acc = gm / (dist * dist);
  const specificEnergy = (speed * speed) / 2 - gm / dist;

  const h = new THREE.Vector3().crossVectors(r, v);
  const hMag = h.length();

  let eccentricity = 0;
  if (hMag > EPS && gm > EPS) {
    const eVec = new THREE.Vector3()
      .crossVectors(v, h)
      .divideScalar(gm)
      .sub(r.clone().divideScalar(dist));
    eccentricity = eVec.length();
  }

  let classification: OrbitClassification;
  if (dist <= centralRadius) {
    classification = 'Collision';
  } else if (eccentricity < 0.01) {
    classification = 'Circular';
  } else if (eccentricity < 0.999) {
    classification = 'Elliptical';
  } else if (eccentricity < 1.001) {
    classification = 'Parabolic';
  } else {
    classification = 'Hyperbolic';
  }

  return {
    distance: dist,
    speed,
    acceleration: acc,
    specificEnergy,
    angularMomentum: h,
    angularMomentumMag: hMag,
    eccentricity,
    classification,
    simTime,
  };
}

/**
 * Compute the velocity required for a circular orbit at a given distance.
 * v_circ = sqrt(GM / r)
 */
export function circularVelocity(gm: number, r: number): number {
  return Math.sqrt(gm / r);
}

/**
 * Compute the escape velocity at a given distance.
 * v_esc = sqrt(2GM / r)
 */
export function escapeVelocity(gm: number, r: number): number {
  return Math.sqrt((2 * gm) / r);
}
