import { Text, ScrollControls, Scroll } from "@react-three/drei";
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

  useEffect(() => {
    setTimeout(() => {
      console.log(text.current);
    }, 2000);
  }, []);
  return (
    <>
      <Navbar />
      <Canvas className="canvas" camera={{ position: [0, 0, 25] }}>
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
        <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.2}
            bokehScale={2}
            height={480}
          />
          <Bloom luminanceThreshold={1} luminanceSmoothing={2} height={300} />
        </EffectComposer>
      </Canvas>
    </>
  );
};

export default App;
