import * as THREE from 'three';

export interface CentralBodyObjects {
  group: THREE.Group;
  mesh: THREE.Mesh;
  glow: THREE.Mesh;
  coronal: THREE.Mesh;
}

/**
 * Central star/planet with realistic shading, emissive lighting,
 * a soft glow sprite, and a subtle coronal shell.
 */
export function createCentralBody(radius: number): CentralBodyObjects {
  const group = new THREE.Group();

  // Main sphere with physical material
  const geometry = new THREE.SphereGeometry(radius, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: 0x4a7fa8,
    emissive: 0x5ec8d8,
    emissiveIntensity: 0.4,
    roughness: 0.6,
    metalness: 0.1,
  });
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  // Inner glow — slightly larger transparent sphere
  const glowGeo = new THREE.SphereGeometry(radius * 1.15, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x5ec8d8,
    transparent: true,
    opacity: 0.12,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  group.add(glow);

  // Coronal shell — larger, very faint
  const coronalGeo = new THREE.SphereGeometry(radius * 1.6, 32, 32);
  const coronalMat = new THREE.MeshBasicMaterial({
    color: 0xa8d5e8,
    transparent: true,
    opacity: 0.05,
    side: THREE.BackSide,
    depthWrite: false,
  });
  const coronal = new THREE.Mesh(coronalGeo, coronalMat);
  group.add(coronal);

  return { group, mesh, glow, coronal };
}
