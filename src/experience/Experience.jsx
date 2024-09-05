import "./Experience.scss";
import "./RenderMaterial.jsx";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  Text,
  useScroll,
  Float,
  Lightformer,
  Environment,
} from "@react-three/drei";
import EnvironmentParticles from "./EnvironmentParticles.jsx";
import gsap from "gsap";
import { Helmet } from "./Vizir.jsx";
import {
  getAstronautPositions,
  getModelPositions,
} from "./getModelPositions.js";

const PARTICLES_COUNT = 3000;

const Experience = () => {
  const scroll = useScroll();

  const renderMaterial = useRef();
  const meshParticles = useRef();
  const textRef = useRef();
  const textRef2 = useRef();
  const timeline = useRef();
  const astronautMesh = useRef();

  const helmetRef = useRef();
  useLayoutEffect(() => {
    timeline.current = gsap.timeline({
      defaults: { duration: 2, ease: "power1.inOut" },
    });

    meshParticles.current.position.y = -5;
    meshParticles.current.position.x = 15;
    meshParticles.current.rotation.y = -7;

    astronautMesh.current.scale.set(0.8, 0.8, 0.8);

    timeline.current
      .to(meshParticles.current.position, { x: 20 }, 0)
      .to(meshParticles.current.rotation, { x: -1.5 }, 0)
      .to(meshParticles.current.position, { z: 20 }, 0)
      .to(meshParticles.current.rotation, { z: -1 }, 0)
      .to(meshParticles.current.position, { y: -10 }, 0)
      .to(helmetRef.current.position, { y: 30 }, 0);

    timeline.current
      .to(meshParticles.current.position, { x: -10 }, 2)
      .to(meshParticles.current.rotation, { x: -3 }, 2)
      .to(meshParticles.current.position, { z: 10 }, 2);
  }, []);

  const count = getAstronautPositions(PARTICLES_COUNT).count;
  const particlesSizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    particlesSizes[i] = Math.random() * 5;
  }

  const lightRef = useRef();

  useFrame(({ gl, clock }, delta) => {
    textRef.current.position.y = scroll.offset * 50;
    textRef2.current.position.y = scroll.offset * 50;

    lightRef.current.position.x = scroll.offset * 100;

    renderMaterial.current.uniforms.uProgress.value = scroll.offset;

    textRef.current.rotation.x = -scroll.offset * 5;
    textRef2.current.rotation.x = -scroll.offset * 5;

    timeline.current.seek(scroll.offset * timeline.current.duration());
  });

  return (
    <>
      {/* <OrbitControls /> */}
      <Environment
        background={false}
        files={"./stars2kEnvMap.hdr"}
        backgroundIntensity={3}
      ></Environment>

      <mesh>
        <sphereGeometry args={[100, 50, 50]} />
        <meshStandardMaterial side={THREE.DoubleSide} />
      </mesh>
      <hemisphereLight color="#291363" groundColor="#7F0B7F" intensity={0.3} />
      <directionalLight
        ref={lightRef}
        color="#4A4ACE"
        intensity={0.2}
        position={[0, -10, 0]}
      />
      <Float>
        <group ref={astronautMesh}>
          <Helmet ref={helmetRef} />
          <points ref={meshParticles}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={getAstronautPositions(PARTICLES_COUNT).positionArray}
                itemSize={3}
                count={getAstronautPositions(PARTICLES_COUNT).count}
              ></bufferAttribute>
              <bufferAttribute
                attach="attributes-aNewPosition"
                array={getModelPositions(PARTICLES_COUNT)}
                itemSize={3}
                count={PARTICLES_COUNT}
              ></bufferAttribute>
              <bufferAttribute
                attach="attributes-aSize"
                array={particlesSizes}
                itemSize={1}
                count={count}
              />
              <bufferAttribute
                attach="attributes-aColor"
                array={getAstronautPositions(PARTICLES_COUNT).colors}
                itemSize={4}
                count={count}
              />
            </bufferGeometry>
            <renderMaterial
              ref={renderMaterial}
              transparent={true}
              additiveBlending={true}
            />
          </points>
        </group>
      </Float>
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
