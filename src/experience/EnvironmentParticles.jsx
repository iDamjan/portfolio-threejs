import vertexShader from "./shaders/environmentParticles/vertex.glsl";
import fragmentShader from "./shaders/environmentParticles/fragment.glsl";
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

const EnvironmentParticles = () => {
  const PARTICLES_COUNT = 1000;
  const positions = new Float32Array(PARTICLES_COUNT * 3);
  const sizes = new Float32Array(PARTICLES_COUNT);

  for (let i = 0; i < PARTICLES_COUNT; i++) {
    const i3 = i * 3;

    positions[i3 + 0] = (Math.random() - 0.5) * 70;
    positions[i3 + 1] = (Math.random() - 0.5) * 50;
    positions[i3 + 2] = (Math.random() - 0.5) * 60;

    sizes[i] = Math.random() * 2;
  }

  const uniforms = useMemo(() => {
    return {
      uTime: new THREE.Uniform(),
    };
  });

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={PARTICLES_COUNT}
        />
        <bufferAttribute
          attach="attributes-aSize"
          array={sizes}
          itemSize={1}
          count={PARTICLES_COUNT}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
      />
    </points>
  );
};

export default EnvironmentParticles;
