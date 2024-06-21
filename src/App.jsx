import {
  Text,
  ScrollControls,
  Scroll,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import "./App.css";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import Experience from "./experience/Experience";
import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";

const App = () => {
  const text = useRef();

  return (
    <>
      <Navbar />
      <Canvas className="canvas" camera={{ position: [0, 0, 25] }}>
        <directionalLight
          position={[-10, -3, 10]}
          intensity={0.3}
          color={"orange"}
        />

        <ScrollControls pages={3}>
          <Experience />

          <Scroll html style={{ width: "100%" }}>
            <div
              style={{ position: "absolute", height: "200vh", width: "100%" }}
            >
              <div className="about">ABOUT ME</div>
            </div>
            <div
              style={{ position: "absolute", height: "300vh", width: "100%" }}
            >
              <div className="contact">CONTACT ME</div>
            </div>
          </Scroll>
        </ScrollControls>
        {/* <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={3}
            bokehScale={2}
            height={480}
          />
          <Bloom luminanceThreshold={1} luminanceSmoothing={2} height={300} />
        </EffectComposer> */}
      </Canvas>
    </>
  );
};

export default App;

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef();
  useFrame(
    (state, delta) =>
      (group.current.position.z += delta * 10) > 20 &&
      (group.current.position.z = -60)
  );
  return (
    <>
      {/* Ceiling */}
      <Lightformer
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={2}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[3, 1, 1]}
            />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer
        intensity={4}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer
        rotation-y={Math.PI / 2}
        position={[-5, -1, -1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        rotation-y={-Math.PI / 2}
        position={[10, 1, 0]}
        scale={[20, 1, 1]}
      />
      {/* Accent (red) */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="red"
          intensity={1}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
      </Float>
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          <Depth
            colorA="blue"
            colorB="black"
            alpha={0.5}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
    </>
  );
}
