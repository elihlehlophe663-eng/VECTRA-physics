import * as THREE from 'three';

export interface VisualizationObjects {
  group: THREE.Group;
  grid: THREE.GridHelper;
  axes: THREE.AxesHelper;
  plane: THREE.Mesh;
  velocityArrow: THREE.ArrowHelper;
}

/**
 * Create reference visualizations: grid, axes, orbital plane, velocity vector.
 * All are toggleable and driven by simulation state.
 */
export function createVisualizations(): VisualizationObjects {
  const group = new THREE.Group();

  // Reference grid
  const grid = new THREE.GridHelper(80, 40, 0x2a3450, 0x1a2138);
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.25;
  grid.visible = false;
  group.add(grid);

  // XYZ axes
  const axes = new THREE.AxesHelper(12);
  axes.visible = false;
  group.add(axes);

  // Orbital plane — a large translucent disc that can be oriented to the
  // angular momentum vector. Starts in the XZ plane.
  const planeGeo = new THREE.RingGeometry(0.1, 60, 64);
  const planeMat = new THREE.MeshBasicMaterial({
    color: 0x5ec8d8,
    transparent: true,
    opacity: 0.04,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.rotation.x = -Math.PI / 2;
  plane.visible = false;
  group.add(plane);

  // Velocity vector arrow
  const velocityArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, 0),
    1,
    0xe8c87a,
    1.5,
    0.8
  );
  velocityArrow.visible = true;
  group.add(velocityArrow);

  return { group, grid, axes, plane, velocityArrow };
}

/**
 * Orient the orbital plane to match the angular momentum vector.
 * The plane's normal should align with h.
 */
export function orientPlane(plane: THREE.Mesh, h: THREE.Vector3): void {
  const hMag = h.length();
  if (hMag < 1e-10) return;
  const normal = h.clone().normalize();
  // The ring is in the XY plane by default (after rotation.x = -PI/2 it's in XZ).
  // We need to orient its normal (currently Y) to match h.
  const defaultNormal = new THREE.Vector3(0, 1, 0);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(defaultNormal, normal);
  plane.quaternion.copy(quaternion);
}
