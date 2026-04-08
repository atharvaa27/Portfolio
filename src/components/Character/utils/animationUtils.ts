import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import type { LoadedCharacter } from "./character";

const animationLoader = new GLTFLoader();
const ROOT_MOTION_TRACK_PATTERN =
  /(?:^|[\].:])Hips(?:[.\]]|:)(?:position|translation)$/i;
const DANCE_RESTART_DELAY_MS = 5000;
const HOLD_POSE_OFFSET_SECONDS = 0.45;

let animationClipPromise: Promise<THREE.AnimationClip | null> | null = null;

const removeRootMotion = (clip: THREE.AnimationClip) => {
  const filteredTracks = clip.tracks.filter(
    (track) => !ROOT_MOTION_TRACK_PATTERN.test(track.name)
  );

  if (filteredTracks.length === clip.tracks.length) {
    return clip;
  }

  return new THREE.AnimationClip(clip.name, clip.duration, filteredTracks);
};

const trimClipForHoldPose = (clip: THREE.AnimationClip) => {
  const targetDuration = Math.max(0.1, clip.duration - HOLD_POSE_OFFSET_SECONDS);
  const endFrame = Math.max(1, Math.floor(targetDuration * 24));

  return THREE.AnimationUtils.subclip(
    clip,
    `${clip.name || "dance"}-hold`,
    0,
    endFrame,
    24
  );
};

const loadAnimationClip = () => {
  if (!animationClipPromise) {
    animationClipPromise = new Promise<THREE.AnimationClip | null>(
      (resolve, reject) => {
        animationLoader.load(
          "/models/breakdance-ending-3.glb",
          (gltf) => {
            const clip = gltf.animations[0] ?? null;
            resolve(clip ? trimClipForHoldPose(removeRootMotion(clip)) : null);
          },
          undefined,
          reject
        );
      }
    );
  }

  return animationClipPromise;
};

const setAnimations = async (character: LoadedCharacter) => {
  const mixer = new THREE.AnimationMixer(character);
  const animationClip =
    (await loadAnimationClip()) ?? character.animations?.[0] ?? null;
  let restartTimeoutId: number | null = null;
  let animationAction: THREE.AnimationAction | null = null;
  let isHoldingPose = false;

  const clearRestartTimeout = () => {
    if (restartTimeoutId !== null) {
      window.clearTimeout(restartTimeoutId);
      restartTimeoutId = null;
    }
  };

  if (animationClip) {
    animationAction = mixer.clipAction(animationClip);
    animationAction.clampWhenFinished = true;
    animationAction.setLoop(THREE.LoopOnce, 1);
    animationAction.enabled = true;
    animationAction.play();
  }

  const handleFinished = (
    event: THREE.Event<"finished", THREE.AnimationMixer> & {
      action: THREE.AnimationAction;
    }
  ) => {
    if (!animationAction || event.action !== animationAction) {
      return;
    }

    isHoldingPose = true;
    clearRestartTimeout();
    restartTimeoutId = window.setTimeout(() => {
      if (!animationAction) {
        return;
      }

      isHoldingPose = false;
      animationAction.reset();
      animationAction.play();
    }, DANCE_RESTART_DELAY_MS);
  };

  mixer.addEventListener("finished", handleFinished);

  function dispose() {
    clearRestartTimeout();
    mixer.removeEventListener("finished", handleFinished);
    mixer.stopAllAction();
  }

  function startIntro() {}

  function hover(_character: LoadedCharacter, _hoverDiv: HTMLDivElement) {}

  function update(_delta: number) {}

  function shouldTrackCursor() {
    return !isHoldingPose;
  }

  return { mixer, startIntro, hover, dispose, update, shouldTrackCursor };
};

export default setAnimations;
