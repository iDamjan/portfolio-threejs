import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import vertexShader from "./shaders/gpgpu/testVertex.glsl";
import fragmentShader from "./shaders/gpgpu/testFragment.glsl";

const SimulationMaterial = shaderMaterial(
  {
    uPosition: null,
    uVelocity: null,
    uBase: null,
    uTime: null,
    uDeltaTime: null,
  },
  vertexShader,
  fragmentShader
);

extend({ SimulationMaterial });
