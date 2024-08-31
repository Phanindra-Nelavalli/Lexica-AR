import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  ViroARScene,
  Viro3DObject,
  ViroARSceneNavigator,
  ViroAmbientLight,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroMaterials,
  ViroAnimations,
  ViroBox,
} from "@reactvision/react-viro";
import { firestore } from "./../Configs/firestore"; // Import Firestore from your config2.js
import { Buffer } from "buffer"; // Import Buffer for hash computation
import md5 from "md5"; // Import md5 hashing library

const HelloWorldSceneAR = () => {
  const [position, setPosition] = useState([0, -1, -2]);
  const [currentAnimation, setCurrentAnimation] = useState("rotateX");

  ViroMaterials.createMaterials({
    wood: { diffuseTexture: require("./../assets/images/woodmat.jpeg") },
  });

  ViroAnimations.registerAnimations({
    rotateX: {
      duration: 3000, // 10 seconds
      properties: { rotateX: "+=90" },
    },
    rotateY: {
      duration: 3000, // 10 seconds
      properties: { rotateY: "+=90" },
    },
    rotateZ: {
      duration: 3000, // 10 seconds
      properties: { rotateZ: "+=90" },
    },
  });

  const handleDrag = (newPosition) => {
    setPosition(newPosition);
  };

  const handleAnimationFinished = () => {
    const animations = ["rotateX", "rotateY", "rotateZ"];
    const nextIndex =
      (animations.indexOf(currentAnimation) + 1) % animations.length;
    setCurrentAnimation(animations[nextIndex]);
  };

  

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />

      <ViroBox
        width={2}
        height={2}
        length={2}
        position={position}
        scale={[0.3, 0.3, 0.3]}
        materials={["wood"]}
        onDrag={handleDrag}
        animation={{
          name: currentAnimation,
          loop: false,
          run: true,
          onFinish: handleAnimationFinished,
        }}
      />
    </ViroARScene>
  );
};

const Cube = () => {
  return (
    <ViroARSceneNavigator
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={{ flex: 1 }}
    />
  );
};

const styles = StyleSheet.create({});

export default Cube;
