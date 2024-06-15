import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const RenderMaterial = shaderMaterial(
  {
    uPosition: null,
  },
  vertexShader,
  fragmentShader
);

extend({ RenderMaterial });
