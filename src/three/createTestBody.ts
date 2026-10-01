import * as THREE from 'three';

/**
 * Test body — a small visible sphere with a subtle glow.
 * Its position is driven entirely by the physics engine.
 */
export interface TestBodyObjects {
  group: THREE.Group;
  mesh: THREE.Mesh;
  glow: THREE.Mesh;
}

export function createTestBody(radius = 0.4): TestBodyObjects {
  const group = new THREE.Group();

  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0xf0e0c8,
    emissive: 0xe8c87a,
    emissiveIntensity: 0.5,
    roughness: 0.4,
    metalness: 0.3,
  });
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  const glowGeo = new THREE.SphereGeometry(radius * 2, 16, 16);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xe8c87a,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  group.add(glow);

  return { group, mesh, glow };
}
