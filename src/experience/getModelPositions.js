import { useGLTF } from "@react-three/drei";

export function getModelPositions(size) {
  const particlesCount = size * size;

  const gltf = useGLTF("./models/dna.glb");

  console.log(gltf.nodes);

  const modelPositions = gltf.nodes.DNA.geometry.attributes.position.array;

  const textureData = new Float32Array(particlesCount * 4);

  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    const i4 = i * 4;

    if (i3 < modelPositions.length) {
      textureData[i4 + 0] = modelPositions[i3 + 0];
      textureData[i4 + 1] = modelPositions[i3 + 1];
      textureData[i4 + 2] = modelPositions[i3 + 2];
      textureData[i4 + 3] = Math.random() * 2;
    } else {
      const randomIndex = Math.floor(modelPositions.length * Math.random()) * 3;
      textureData[i4 + 0] = modelPositions[randomIndex + 0];
      textureData[i4 + 1] = modelPositions[randomIndex + 1];
      textureData[i4 + 2] = modelPositions[randomIndex + 2];
      textureData[i4 + 3] = Math.random() * 2;
    }
  }

  return textureData;
}
