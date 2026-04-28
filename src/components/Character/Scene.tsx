import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import { clearCharacterScrollState } from "../utils/GsapScroll";
import {
  createCursorEyes,
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
  updateCursorEyes,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const getRendererPixelRatio = () => Math.min(window.devicePixelRatio || 1, 1.5);
const INITIAL_CAMERA_POSITION = new THREE.Vector3(0, 13.1, 31.5);
const INITIAL_CAMERA_ZOOM = 0.9;

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const characterRef = useRef<THREE.Object3D | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      let isDisposed = false;
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(getRendererPixelRatio());
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.copy(INITIAL_CAMERA_POSITION);
      camera.zoom = INITIAL_CAMERA_ZOOM;
      camera.updateProjectionMatrix();

      let spineBone: THREE.Object3D | null = null;
      let neckBone: THREE.Object3D | null = null;
      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;
      let animations: Awaited<ReturnType<typeof setAnimations>> | undefined;
      let cursorEyes: ReturnType<typeof createCursorEyes> | null = null;
      let animationFrameId = 0;
      let introTimeoutId: number | undefined;
      let touchMoveElement: HTMLElement | null = null;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      let hasCompletedInitialLoading = false;
      const completeInitialLoading = () => {
        if (hasCompletedInitialLoading) {
          return;
        }

        hasCompletedInitialLoading = true;
        progress.loaded().then(() => {
          if (isDisposed) {
            return;
          }

          introTimeoutId = window.setTimeout(() => {
            if (isDisposed) {
              return;
            }

            light.turnOnLights();
            animations?.startIntro();
          }, 2500);
        });
      };
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then(async (loadedCharacter) => {
        if (!loadedCharacter || isDisposed) {
          completeInitialLoading();
          return;
        }

        const character = loadedCharacter;

        if (characterRef.current && characterRef.current !== character) {
          scene.remove(characterRef.current);
        }

        characterRef.current = character;
        if (!scene.children.includes(character)) {
          scene.add(character);
        }
        completeInitialLoading();

        try {
          const nextAnimations = await setAnimations(loadedCharacter);
          if (isDisposed) {
            nextAnimations.dispose();
            return;
          }

          animations = nextAnimations;
          hoverDivRef.current &&
            animations.hover(loadedCharacter, hoverDivRef.current);
          mixer = animations.mixer;
        } catch (error) {
          if (!isDisposed) {
            console.error("Error setting character animations:", error);
          }
        }

        if (isDisposed) {
          return;
        }

        spineBone =
          character.getObjectByName("mixamorig:Spine2") ||
          character.getObjectByName("mixamorigSpine2") ||
          character.getObjectByName("Spine2") ||
          null;
        neckBone =
          character.getObjectByName("mixamorig:Neck") ||
          character.getObjectByName("mixamorigNeck") ||
          character.getObjectByName("Neck") ||
          null;
        headBone =
          character.getObjectByName("mixamorig:Head") ||
          character.getObjectByName("mixamorigHead") ||
          character.getObjectByName("Head") ||
          null;
        if (headBone) {
          cursorEyes = createCursorEyes(headBone);
        }
        screenLight = character.getObjectByName("screenlight") || null;
        completeInitialLoading();
      }).catch((error) => {
        if (!isDisposed) {
          console.error("Error loading character scene:", error);
          completeInitialLoading();
        }
      });

      const onResize = () => {
        if (!characterRef.current) return;
        handleResize(renderer, camera, canvasDiv, characterRef.current);
      };

      window.addEventListener("resize", onResize);

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      const onTouchMove = (event: TouchEvent) => {
        handleTouchMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        touchMoveElement?.removeEventListener("touchmove", onTouchMove);
        touchMoveElement = element;
        debounce = setTimeout(() => {
          touchMoveElement?.addEventListener("touchmove", onTouchMove, {
            passive: true,
          });
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      const isLandingActive = () => {
        if (!landingDiv) return false;
        const rect = landingDiv.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.2 && rect.bottom >= window.innerHeight * 0.55;
      };

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        const shouldTrackCursor = animations?.shouldTrackCursor?.() ?? true;
        const shouldApplyHeroTracking = shouldTrackCursor && isLandingActive();
        if (shouldApplyHeroTracking && spineBone) {
          handleHeadRotation(
            spineBone,
            mouse.x,
            mouse.y,
            interpolation.x * 0.55,
            interpolation.y * 0.55,
            THREE.MathUtils.lerp,
            0.32
          );
        }
        if (shouldApplyHeroTracking && neckBone) {
          handleHeadRotation(
            neckBone,
            mouse.x,
            mouse.y,
            interpolation.x * 0.8,
            interpolation.y * 0.8,
            THREE.MathUtils.lerp,
            0.68
          );
        }
        if (shouldApplyHeroTracking && headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp,
            1.45
          );
          light.setPointLight(screenLight);
        }
        if (shouldApplyHeroTracking && cursorEyes) {
          updateCursorEyes(cursorEyes, mouse.x, mouse.y, THREE.MathUtils.lerp);
        }
        animations?.update(delta);
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        isDisposed = true;
        cancelAnimationFrame(animationFrameId);
        clearTimeout(debounce);
        clearTimeout(introTimeoutId);
        touchMoveElement?.removeEventListener("touchmove", onTouchMove);
        cursorEyes?.dispose();
        animations?.dispose();
        clearCharacterScrollState();
        if (characterRef.current) {
          scene.remove(characterRef.current);
          characterRef.current = null;
        }
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", onResize);
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
        document.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
