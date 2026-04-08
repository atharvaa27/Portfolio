import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

export type LoadedCharacter = THREE.Group & {
  animations?: THREE.AnimationClip[];
};

const INITIAL_CHARACTER_X_OFFSET = 0.15;
const INITIAL_CHARACTER_Y_ROTATION = -0.82;

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();

  const loadCharacter = () => {
    return new Promise<LoadedCharacter | null>((resolve, reject) => {
      try {
        loader.load(
          "/models/thinking.glb",
          async (gltf) => {
            const character = gltf.scene as LoadedCharacter;
            character.animations = gltf.animations;
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                const materials = Array.isArray(mesh.material)
                  ? mesh.material
                  : [mesh.material];
                materials.forEach((material: any) => {
                  if (material?.map) {
                    material.map.colorSpace = THREE.SRGBColorSpace;
                  }
                  material.needsUpdate = true;
                });
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            await renderer.compileAsync(character, camera, scene);

            // Compute native size, then scale to a fixed scene height of 6 units
            const box = new THREE.Box3().setFromObject(character);
            const nativeHeight = box.max.y - box.min.y;
            const desiredHeight = 6;
            const sf = desiredHeight / nativeHeight;
            character.scale.setScalar(sf);

            // After scaling, place feet at y=5 so the torso is centered in view
            const scaledMin = box.min.y * sf;
            character.position.set(INITIAL_CHARACTER_X_OFFSET, 5 - scaledMin, 0);
            character.rotation.y = INITIAL_CHARACTER_Y_ROTATION;

            setCharTimeline(character, camera);
            setAllTimeline();

            // Monitor scale is handled by GsapScroll.ts animations
            resolve(character);
          },
          undefined,
          (error) => {
            console.error("Error loading GLB model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
