import React, { forwardRef } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { useControls, button } from "leva";

export const Helmet = forwardRef(function (props, ref) {
  const { nodes, materials } = useGLTF("./models/vizir.glb");
  const scroll = useScroll();
  const material = new THREE.MeshPhysicalMaterial({
    roughness: 0,
    metalness: 1,
  });
  // Added comment
  const { position, scale, rotation } = useControls("vizir", {
    position: {
      value: { x: 15.1, y: -6, z: 1.5 },
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
    <group {...props} dispose={null} ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.vizor.geometry}
        position={[position.x + scroll.offset, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={scale}
      >
        <meshPhysicalMaterial
          roughness={0}
          metalness={0.2}
          reflectivity={1}
          iridescence={1}
        />
      </mesh>
    </group>
  );
});

useGLTF.preload("/vizir.glb");
