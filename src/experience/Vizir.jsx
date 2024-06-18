import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useControls, button } from "leva";

export function Vizir(props) {
  const { nodes, materials } = useGLTF("./models/vizir.glb");
  const material = new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    color: "white",
    side: THREE.DoubleSide,
  });
  const { position, scale, rotation } = useControls("vizir", {
    position: {
      value: { x: 10.1, y: -6, z: 1.5 },
      step: 0.001,
    },
    rotation: {
      value: { x: -0.1, y: -0.8, z: 0 },
      step: 0.001,
    },
    scale: {
      value: 2.2,
      step: 0.01,
    },
  });
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.vizor.geometry}
        material={material}
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={scale}
      />
    </group>
  );
}

useGLTF.preload("/vizir.glb");
