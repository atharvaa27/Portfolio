import * as THREE from "three";
import { createElement, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { renderToStaticMarkup } from "react-dom/server";
import type { IconType } from "react-icons";
import {
  SiDatabricks,
  SiDjango,
  SiDocker,
  SiElasticsearch,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGithub,
  SiJenkins,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOpenai,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTensorflow,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import {
  BallCollider,
  CylinderCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";

type TechBadge = {
  label: string;
  icon: IconType;
  accent: string;
  glow: string;
};

const techBadges: TechBadge[] = [
  { label: "Python", icon: SiPython, accent: "#3776AB", glow: "#FFD43B" },
  { label: "Django", icon: SiDjango, accent: "#0F5B41", glow: "#44B78B" },
  { label: "Flask", icon: SiFlask, accent: "#111827", glow: "#A7F3D0" },
  { label: "FastAPI", icon: SiFastapi, accent: "#009688", glow: "#99F6E4" },
  { label: "React", icon: SiReact, accent: "#61DAFB", glow: "#B6F0FF" },
  { label: "Next.js", icon: SiNextdotjs, accent: "#111111", glow: "#F3F4F6" },
  { label: "Node.js", icon: SiNodedotjs, accent: "#339933", glow: "#BBF7D0" },
  { label: "Express", icon: SiExpress, accent: "#111827", glow: "#E5E7EB" },
  { label: "MongoDB", icon: SiMongodb, accent: "#47A248", glow: "#BBF7D0" },
  { label: "MySQL", icon: SiMysql, accent: "#4479A1", glow: "#BFDBFE" },
  { label: "PostgreSQL", icon: SiPostgresql, accent: "#336791", glow: "#B7D3EA" },
  { label: "Docker", icon: SiDocker, accent: "#2496ED", glow: "#9DDCFF" },
  { label: "Kubernetes", icon: SiKubernetes, accent: "#326CE5", glow: "#BFDBFE" },
  { label: "Jenkins", icon: SiJenkins, accent: "#D24939", glow: "#FECACA" },
  { label: "Databricks", icon: SiDatabricks, accent: "#FF3621", glow: "#FFB4AA" },
  { label: "OpenAI", icon: SiOpenai, accent: "#111827", glow: "#C4B5FD" },
  { label: "TensorFlow", icon: SiTensorflow, accent: "#FF6F00", glow: "#FFD28F" },
  { label: "Scikit", icon: SiScikitlearn, accent: "#F7931E", glow: "#7DD3FC" },
  { label: "NumPy", icon: SiNumpy, accent: "#4D77CF", glow: "#BFDBFE" },
  { label: "Pandas", icon: SiPandas, accent: "#150458", glow: "#DDD6FE" },
  { label: "Elastic", icon: SiElasticsearch, accent: "#005571", glow: "#A7F3D0" },
  { label: "TypeScript", icon: SiTypescript, accent: "#3178C6", glow: "#93C5FD" },
  { label: "Git", icon: SiGit, accent: "#F05032", glow: "#FDBA74" },
  { label: "GitHub", icon: SiGithub, accent: "#111827", glow: "#D1D5DB" },
  { label: "Vercel", icon: SiVercel, accent: "#111111", glow: "#E5E7EB" },
];

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = techBadges.map((_, index) => ({
  scale: [0.82, 0.9, 0.98, 0.88][index % 4],
  materialIndex: index,
}));

const parseIcon = (icon: IconType) => {
  const markup = renderToStaticMarkup(createElement(icon));
  const viewBoxMatch = markup.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch
    ? viewBoxMatch[1].split(" ").map(Number)
    : [0, 0, 24, 24];
  const paths = [...markup.matchAll(/<path[^>]*d="([^"]+)"/g)].map(
    (match) => match[1]
  );

  return {
    paths,
    width: viewBox[2] || 24,
    height: viewBox[3] || 24,
  };
};

const drawIcon = (
  context: CanvasRenderingContext2D,
  badge: TechBadge,
  centerX: number,
  centerY: number,
  size: number,
  opacity: number,
  fillColor: string = badge.accent
) => {
  const { paths, width, height } = parseIcon(badge.icon);

  context.save();
  context.translate(centerX, centerY);
  context.scale(size / width, size / height);
  context.translate(-width / 2, -height / 2);
  context.fillStyle = fillColor;
  context.globalAlpha = opacity;

  paths.forEach((path) => {
    context.fill(new Path2D(path));
  });

  context.restore();
};

const createBadgeTexture = (badge: TechBadge): THREE.CanvasTexture => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  if (!context) {
    texture.needsUpdate = true;
    return texture;
  }

  const baseGradient = context.createRadialGradient(380, 280, 80, 512, 512, 680);
  baseGradient.addColorStop(0, "#ffffff");
  baseGradient.addColorStop(0.56, "#f7f3fb");
  baseGradient.addColorStop(1, "#e7e2f0");
  context.fillStyle = baseGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const haloGradient = context.createRadialGradient(512, 512, 70, 512, 512, 320);
  haloGradient.addColorStop(0, badge.glow);
  haloGradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = haloGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "rgba(255,255,255,0.32)";
  context.beginPath();
  context.roundRect(72, 262, 880, 500, 240);
  context.fill();

  context.strokeStyle = "rgba(255,255,255,0.24)";
  context.lineWidth = 5;
  context.stroke();

  context.fillStyle = "rgba(255,255,255,0.36)";
  context.beginPath();
  context.arc(332, 332, 54, 0, Math.PI * 2);
  context.fill();

  drawIcon(context, badge, 216, 512, 220, 0.28, "rgba(17,24,39,0.16)");
  drawIcon(context, badge, 512, 512, 360, 0.22, "rgba(17,24,39,0.22)");
  drawIcon(context, badge, 512, 512, 320, 1);
  drawIcon(context, badge, 808, 512, 220, 0.28, "rgba(17,24,39,0.16)");

  texture.needsUpdate = true;
  return texture;
};

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
  r?: typeof THREE.MathUtils.randFloatSpread;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(17), r(14) - 18, r(17) - 7]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationFrameId = 0;

    const updateActivity = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const entersViewport = rect.top < viewportHeight * 0.82;
      const stillVisible = rect.bottom > viewportHeight * 0.18;

      setIsActive(entersViewport && stillVisible);
    };

    const requestUpdate = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateActivity);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const materials = useMemo(() => {
    const textures = techBadges.map((badge) => createBadgeTexture(badge));

    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.42,
          metalness: 0.06,
          roughness: 0.94,
          clearcoat: 0.03,
        })
    );
  }, []);

  return (
    <div className="techstack" ref={sectionRef}>
      <h2> Tools I Use</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[props.materialIndex % materials.length]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
