import React from 'react';
import Nav from '../../components/HomePageCompo/Nav';
import Scene from '../../game/Scene';
import { Physics } from "@react-three/cannon";
import "../../assets/global.css";
import { Canvas } from "@react-three/fiber";

function Game() {
  return (
    <>
      <Nav />
      <div style={{ margin: 0, width: '100%', height: '100vh', overflow: 'auto' }}>
        <Canvas>
          <Physics broadphase="SAP" gravity={[0, -2.1, 0]}>
            <Scene />
          </Physics>
        </Canvas>
      </div>
    </>
  );
}

export default Game;

