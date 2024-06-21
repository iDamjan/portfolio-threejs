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
  const gltf = useGLTF("./models/astronaut2.glb");
  const { nodes } = useGLTF("./models/astronaut2.glb");

  let mesh = null;
  let colors = null;
  // Traverse the nodes to find the first mesh
  nodes.astronaut.traverse((child) => {
    if (child.isMesh) {
      mesh = child;
      colors = mesh.geometry.attributes.color;
      console.log(colors);
    }
  });

  const finalObject = {
    count: mesh.geometry.attributes.position.count,
    positionArray: new Float32Array(
      mesh.geometry.attributes.position.count * 3
    ),
    colors: mesh.geometry.attributes.color.array,
  };

  const sampler = new MeshSurfaceSampler(mesh).setWeightAttribute(null).build();

  const originalPositions = mesh.geometry.attributes.position.array;
  const data = new Float32Array(finalObject.count * 3);
  const point = new THREE.Vector3();
  const blendFactor = 0.02; // Adjust this value between 0 and 1 for more or less randomness

  for (let i = 0; i < finalObject.count; i++) {
    const i3 = i * 3;

    sampler.sample(point);

    // Blend between original position and sampled position
    finalObject.positionArray[i3 + 0] = THREE.MathUtils.lerp(
      originalPositions[i3 + 0],
      point.x,
      blendFactor
    );
    finalObject.positionArray[i3 + 1] = THREE.MathUtils.lerp(
      originalPositions[i3 + 1],
      point.y,
      blendFactor
    );
    finalObject.positionArray[i3 + 2] = THREE.MathUtils.lerp(
      originalPositions[i3 + 2],
      point.z,
      blendFactor
    );
  }

  return finalObject;
}
