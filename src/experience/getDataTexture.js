import * as THREE from "three";
import { getModelPositions } from "./getModelPositions.js";

export function getDataTexture(size) {
  const radius = 8;
  let number = size * size;
  const data = new Float32Array(4 * number);

  for (let i = 0; i < number; i++) {
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);

    let x = radius * Math.sin(theta) * Math.cos(phi);
    let y = radius * Math.sin(theta) * Math.sin(phi);
    let z = radius * Math.cos(theta);
    let w = Math.random() * 3;

    data.set([x, y, z, w], i * 4);
  }

  let dataTexture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
}

export function getMorphDataTexture(size) {
  const data = getModelPositions(size);

  let dataTexture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
}
