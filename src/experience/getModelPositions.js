import { useGLTF } from "@react-three/drei";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import * as THREE from "three";

export function getModelPositions(size) {
  const particlesCount = size * size;

  const { nodes } = useGLTF("./models/dna.glb");

  let mesh = nodes.DNA;
  const sampler = new MeshSurfaceSampler(mesh).setWeightAttribute(null).build();

  const textureData = new Float32Array(particlesCount * 4);
  const point = new THREE.Vector3();

  for (let i = 0; i < particlesCount; i++) {
    const i4 = i * 4;

    sampler.sample(point);

    textureData[i4 + 0] = point.x;
    textureData[i4 + 1] = point.y;
    textureData[i4 + 2] = point.z;
    textureData[i4 + 3] = Math.random() * 2; // Or any other value for the fourth channel
  }

  return textureData;
}

export function getAstronautPositions(size) {
  const particlesCount = size * size;

  const { nodes } = useGLTF("./models/astronaut.glb");

  let mesh = null;
  // Traverse the nodes to find the first mesh
  nodes.astronaut.traverse((child) => {
    if (child.isMesh) {
      mesh = child;
    }
  });

  const sampler = new MeshSurfaceSampler(mesh).setWeightAttribute(null).build();

  const textureData = new Float32Array(particlesCount * 4);
  const point = new THREE.Vector3();

  for (let i = 0; i < particlesCount; i++) {
    const i4 = i * 4;

    sampler.sample(point);

    textureData[i4 + 0] = point.x;
    textureData[i4 + 1] = point.y;
    textureData[i4 + 2] = point.z;
    textureData[i4 + 3] = Math.random() * 2; // Or any other value for the fourth channel
  }

  return textureData;
}
