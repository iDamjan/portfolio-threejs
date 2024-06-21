import { useGLTF } from "@react-three/drei";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import * as THREE from "three";

export function getModelPositions(particlesCount) {
  const { nodes } = useGLTF("./models/dna.glb");

  let mesh = nodes.DNA;
  const sampler = new MeshSurfaceSampler(mesh).setWeightAttribute(null).build();

  const data = new Float32Array(particlesCount * 3);
  const point = new THREE.Vector3();

  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;

    sampler.sample(point);

    data[i3 + 0] = point.x;
    data[i3 + 1] = point.y;
    data[i3 + 2] = point.z;
  }

  return data;
}

export function getAstronautPositions(particlesCount) {
  const { nodes } = useGLTF("./models/astronaut.glb");

  let mesh = null;
  // Traverse the nodes to find the first mesh
  nodes.astronaut.traverse((child) => {
    if (child.isMesh) {
      mesh = child;
    }
  });

  const sampler = new MeshSurfaceSampler(mesh).setWeightAttribute(null).build();

  const data = new Float32Array(particlesCount * 3);
  const point = new THREE.Vector3();

  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;

    sampler.sample(point);

    data[i3 + 0] = point.x;
    data[i3 + 1] = point.y;
    data[i3 + 2] = point.z;
  }

  return data;
}
