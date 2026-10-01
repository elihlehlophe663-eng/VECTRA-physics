import * as THREE from 'three';

export interface TrailObjects {
  mesh: THREE.Line;
  positions: Float32Array;
  geometry: THREE.BufferGeometry;
  count: number;
  head: number;
  filled: number;
}

/**
 * Create a thin orbital trail using a dynamic Line with a fixed-size buffer.
 * Points are written in a ring buffer pattern to avoid reallocation.
 */
export function createTrail(maxPoints = 2000): TrailObjects {
  const positions = new Float32Array(maxPoints * 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setDrawRange(0, 0);

  const material = new THREE.LineBasicMaterial({
    color: 0xa8d5e8,
    transparent: true,
    opacity: 0.55,
    linewidth: 1,
    depthWrite: false,
  });

  const mesh = new THREE.Line(geometry, material);
  mesh.frustumCulled = false;

  return {
    mesh,
    positions,
    geometry,
    count: maxPoints,
    head: 0,
    filled: 0,
  };
}

/**
 * Add a point to the trail ring buffer.
 */
export function addTrailPoint(trail: TrailObjects, x: number, y: number, z: number): void {
  const idx = trail.head * 3;
  trail.positions[idx] = x;
  trail.positions[idx + 1] = y;
  trail.positions[idx + 2] = z;

  trail.head = (trail.head + 1) % trail.count;
  trail.filled = Math.min(trail.filled + 1, trail.count);

  // Rebuild the draw range as a contiguous segment from oldest to newest.
  // When the buffer wraps, we draw all points (the ring is full).
  if (trail.filled < trail.count) {
    // Not yet wrapped — draw from 0 to head
    trail.geometry.setDrawRange(0, trail.filled);
  } else {
    // Full ring — draw everything
    trail.geometry.setDrawRange(0, trail.count);
  }

  trail.geometry.attributes.position.needsUpdate = true;
}

/**
 * Clear all trail points.
 */
export function clearTrail(trail: TrailObjects): void {
  trail.head = 0;
  trail.filled = 0;
  trail.geometry.setDrawRange(0, 0);
  trail.geometry.attributes.position.needsUpdate = true;
}

/**
 * Update the maximum number of trail points.
 * This recreates the buffer with a new size.
 */
export function resizeTrail(trail: TrailObjects, newMax: number): void {
  trail.count = newMax;
  trail.positions = new Float32Array(newMax * 3);
  trail.geometry.setAttribute('position', new THREE.BufferAttribute(trail.positions, 3));
  clearTrail(trail);
}
