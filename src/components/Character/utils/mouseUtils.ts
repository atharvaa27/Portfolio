import * as THREE from "three";

type CursorEyeBinding = {
  basePosition: THREE.Vector3;
  mesh: THREE.Mesh;
};

export type CursorEyeRig = {
  bindings: CursorEyeBinding[];
  dispose: () => void;
};

const CURSOR_EYE_BASE_POSITIONS = [
  new THREE.Vector3(-0.108, 0.175, 0.105),
  new THREE.Vector3(0.108, 0.175, 0.105),
];

export const handleMouseMove = (
  event: MouseEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchMove = (
  event: TouchEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchEnd = (
  setMousePosition: (
    x: number,
    y: number,
    interpolationX: number,
    interpolationY: number
  ) => void
) => {
  setTimeout(() => {
    setMousePosition(0, 0, 0.03, 0.03);
    setTimeout(() => {
      setMousePosition(0, 0, 0.1, 0.2);
    }, 1000);
  }, 2000);
};

export const createCursorEyes = (headBone: THREE.Object3D): CursorEyeRig => {
  const pupilGeometry = new THREE.CircleGeometry(0.026, 24);
  const pupilMaterial = new THREE.MeshBasicMaterial({
    color: "#120604",
    transparent: true,
    opacity: 0.9,
  });
  const highlightGeometry = new THREE.CircleGeometry(0.006, 16);
  const highlightMaterial = new THREE.MeshBasicMaterial({
    color: "#fff8ea",
    transparent: true,
    opacity: 0.85,
  });

  const bindings = CURSOR_EYE_BASE_POSITIONS.map((basePosition, index) => {
    const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    const highlight = new THREE.Mesh(highlightGeometry, highlightMaterial);

    pupil.name = `cursor-pupil-${index}`;
    pupil.position.copy(basePosition);
    pupil.renderOrder = 6;
    pupil.frustumCulled = false;

    highlight.position.set(-0.008, 0.008, 0.001);
    highlight.renderOrder = 7;
    pupil.add(highlight);
    headBone.add(pupil);

    return {
      basePosition: basePosition.clone(),
      mesh: pupil,
    };
  });

  return {
    bindings,
    dispose: () => {
      bindings.forEach(({ mesh }) => {
        mesh.removeFromParent();
      });
      pupilGeometry.dispose();
      pupilMaterial.dispose();
      highlightGeometry.dispose();
      highlightMaterial.dispose();
    },
  };
};

export const updateCursorEyes = (
  eyeRig: CursorEyeRig,
  mouseX: number,
  mouseY: number,
  lerp: (x: number, y: number, t: number) => number
) => {
  const offsetX = THREE.MathUtils.clamp(mouseX * 0.022, -0.022, 0.022);
  const offsetY = THREE.MathUtils.clamp(-mouseY * 0.018, -0.018, 0.018);

  eyeRig.bindings.forEach(({ basePosition, mesh }) => {
    mesh.position.x = lerp(mesh.position.x, basePosition.x + offsetX, 0.18);
    mesh.position.y = lerp(mesh.position.y, basePosition.y + offsetY, 0.18);
    mesh.position.z = lerp(mesh.position.z, basePosition.z, 0.18);
  });
};

export const handleHeadRotation = (
  headBone: THREE.Object3D,
  mouseX: number,
  mouseY: number,
  interpolationX: number,
  interpolationY: number,
  lerp: (x: number, y: number, t: number) => number,
  strength: number = 1
) => {
  if (!headBone) return;
  const currentRotationX = headBone.rotation.x;
  const currentRotationY = headBone.rotation.y;
  const maxRotation = (Math.PI / 4.6) * strength;
  const targetRotationY = THREE.MathUtils.clamp(
    mouseX * maxRotation * 1.2,
    -maxRotation,
    maxRotation
  );
  const targetRotationX = THREE.MathUtils.clamp(
    -mouseY * 0.42 * strength,
    -0.24 * strength,
    0.3 * strength
  );

  headBone.rotation.y = lerp(
    currentRotationY,
    currentRotationY + targetRotationY,
    interpolationY
  );
  headBone.rotation.x = lerp(
    currentRotationX,
    currentRotationX + targetRotationX,
    interpolationX
  );
};
