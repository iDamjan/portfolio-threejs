import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import vertexShader from "./shaders/gpgpu/vertex.glsl";
import fragmentShader from "./shaders/gpgpu/fragment.glsl";

const SimulationMaterial = shaderMaterial(
  {
    uPosition: null,
    uVelocity: null,
    uBase: null,
    uTime: null,
    uDeltaTime: null,
    uProgress: null,
    uNewPosition: null,
  },
  vertexShader,
  fragmentShader
);

extend({ SimulationMaterial });
