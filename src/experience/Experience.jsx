import "./Experience.scss";
import "./RenderMaterial.jsx";
import "./SimulationMaterial.jsx";

import * as THREE from "three";
import { createPortal, useFrame } from "@react-three/fiber";
import { getDataTexture, getMorphDataTexture } from "./getDataTexture.js";
import { useLayoutEffect, useRef } from "react";
import { useFBO, Text, useScroll, useGLTF } from "@react-three/drei";
import EnvironmentParticles from "./EnvironmentParticles.jsx";
import ScrollProgress from "../components/ScrollProgress.jsx";
import gsap from "gsap";

const PARTICLES_COUNT = 200000;
const SIZE = Math.ceil(Math.sqrt(PARTICLES_COUNT));

const positions = new Float32Array(PARTICLES_COUNT * 3);
const sphereRadius = 8;

// VERTICIES FOR GEOMETRY THAT I DONTKNOW WHAT IS ABOUT??
for (let i = 0; i < PARTICLES_COUNT; i++) {
  const i3 = i * 3;

  const theta = THREE.MathUtils.randFloatSpread(360);
  const phi = THREE.MathUtils.randFloatSpread(360);

  let x = sphereRadius * Math.sin(theta) * Math.cos(phi);
  let y = sphereRadius * Math.sin(theta) * Math.sin(phi);
  let z = sphereRadius * Math.cos(theta);

  positions[i3 + 0] = x;
  positions[i3 + 1] = y;
  positions[i3 + 2] = z;
}

const particlesUvArray = new Float32Array(PARTICLES_COUNT * 2);
const particlesSizes = new Float32Array(PARTICLES_COUNT);

// GENERATE UVs SO WE CAN ATTACH THE TEXTURE FROM THE FBO
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    const i = y * SIZE + x;
    const i2 = i * 2;

    // Particles UV
    const uvX = (x + 0.5) / SIZE;
    const uvY = (y + 0.5) / SIZE;

    particlesUvArray[i2 + 0] = uvX;
    particlesUvArray[i2 + 1] = uvY;

    particlesSizes[i] = Math.random() + 0.2;
  }
}

const Experience = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
  const scroll = useScroll();

  const gltf = useGLTF("./models/robot.glb");

  let target0 = useFBO(SIZE, SIZE, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });
  let target1 = useFBO(SIZE, SIZE, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });

  const simMaterial = useRef();
  const renderMaterial = useRef();
  const meshParticles = useRef();
  const textRef = useRef();
  const textRef2 = useRef();
  const timeline = useRef();

  const baseTexture = getDataTexture(SIZE);
  const newBaseTexture = getMorphDataTexture(SIZE);

  useLayoutEffect(() => {
    timeline.current = gsap.timeline({
      defaults: { duration: 2, ease: "power1.inOut" },
    });

    timeline.current
      .to(meshParticles.current.position, { x: 10 }, 0)
      .to(meshParticles.current.rotation, { x: -1.5 }, 0)
      .to(meshParticles.current.position, { z: 10 }, 0)
      .to(meshParticles.current.rotation, { z: -1 }, 0)
      .to(meshParticles.current.position, { y: -20 }, 0);

    timeline.current
      .to(meshParticles.current.position, { x: -10 }, 2)
      .to(meshParticles.current.rotation, { x: -3 }, 2)
      .to(meshParticles.current.position, { z: 10 }, 2);
  }, []);

  useFrame(({ gl, clock }, delta) => {
    gl.setRenderTarget(target0);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    renderMaterial.current.uniforms.uPosition.value = target1.texture;
    simMaterial.current.uniforms.uPosition.value = target0.texture;

    let temp = target0;
    target0 = target1;
    target1 = temp;

    // Set base texture
    simMaterial.current.uniforms.uBase = new THREE.Uniform(baseTexture);
    simMaterial.current.uniforms.uNewBase = new THREE.Uniform(newBaseTexture);
    simMaterial.current.uniforms.uTime.value = clock.elapsedTime;
    simMaterial.current.uniforms.uDeltaTime.value = delta;
    simMaterial.current.uniforms.uProgress.value = scroll.offset;

    // Rotate sphere
    // meshParticles.current.rotation.x += delta * 0.04;
    // meshParticles.current.rotation.y += delta * 0.05;

    textRef.current.position.y = scroll.offset * 50;
    textRef2.current.position.y = scroll.offset * 50;

    textRef.current.rotation.x = -scroll.offset * 5;
    textRef2.current.rotation.x = -scroll.offset * 5;

    timeline.current.seek(scroll.offset * timeline.current.duration());
  });

  return (
    <>
      {createPortal(
        <mesh>
          <planeGeometry args={[2, 2]} />
          <simulationMaterial
            ref={simMaterial}
            uPosition={getDataTexture(SIZE)}
            uVelocity={getDataTexture(SIZE)}
            uBase={getDataTexture(SIZE)}
            uNewPosition={getMorphDataTexture(SIZE)}
          />
        </mesh>,
        scene
      )}

      <points ref={meshParticles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            itemSize={3}
            count={PARTICLES_COUNT}
          ></bufferAttribute>
          <bufferAttribute
            attach="attributes-aParticlesUv"
            array={particlesUvArray}
            itemSize={2}
            count={PARTICLES_COUNT}
          />
          <bufferAttribute
            attach="attributes-aSize"
            array={particlesSizes}
            itemSize={1}
            count={PARTICLES_COUNT}
          />
        </bufferGeometry>
        <renderMaterial ref={renderMaterial} transparent={true} />
      </points>

      <EnvironmentParticles />

      <Text
        ref={textRef}
        position={[-20, 0, 0]}
        scale={3}
        rotation={[0, 0, 0]}
        color={[1, 1, 1]}
      >
        {/* SOFTWARE */}
      </Text>
      <Text position={[22, 0, 0]} scale={3} color={"#F2F2F2"} ref={textRef2}>
        {/* DEVELOPER */}
      </Text>

      {/* <Html>
        <ScrollProgress />
      </Html> */}
    </>
  );
};

export default Experience;
