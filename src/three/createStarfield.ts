import * as THREE from 'three';

/**
 * Procedural starfield with depth — points distributed in a spherical shell.
 * Subtle enough to stay in the background.
 */
export function createStarfield(count = 3000, radius = 500): THREE.Points {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const colorWarm = new THREE.Color(0xf0e0c8);
  const colorBlue = new THREE.Color(0x9fb8e8);
  const colorWhite = new THREE.Color(0xe8edf5);

  for (let i = 0; i < count; i++) {
    // Distribute in a spherical shell for depth
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.7 + Math.random() * 0.3);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    // Vary star colors
    const rand = Math.random();
    let color: THREE.Color;
    if (rand < 0.6) color = colorWhite;
    else if (rand < 0.85) color = colorBlue;
    else color = colorWarm;

    const brightness = 0.3 + Math.random() * 0.7;
    colors[i * 3] = color.r * brightness;
    colors[i * 3 + 1] = color.g * brightness;
    colors[i * 3 + 2] = color.b * brightness;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 1.2,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}
