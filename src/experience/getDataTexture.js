import * as THREE from "three";
import {
  getAstronautPositions,
  getModelPositions,
} from "./getModelPositions.js";

export function getDataTexture(size) {
  const data = getAstronautPositions(size);

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
