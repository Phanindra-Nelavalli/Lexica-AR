import React, { useEffect, useRef, useState } from "react";
import {
  ViroARScene,
  ViroBox,
  ViroAmbientLight,
  ViroMaterials,
  ViroAnimations,
} from "@reactvision/react-viro";

const Sceondscene = ({ rotationAxis }) => {
  const [position, setPosition] = useState([0, -1, -2]);
  const boxRef = useRef(null); // Ref to manage the box's animation state

  useEffect(() => {
    ViroMaterials.createMaterials({
      wood: { diffuseTexture: require("./../assets/images/wood.jpeg") },
    });

    ViroAnimations.registerAnimations({
      rotateX: {
        duration: 2000,
        properties: { rotateX: "+=90" },
      },
      rotateY: {
        duration: 2000,
        properties: { rotateY: "+=90" },
      },
      rotateZ: {
        duration: 2000,
        properties: { rotateZ: "+=90" },
      },
    });
  }, []);

  useEffect(() => {
    if (boxRef.current) {
      // Run the animation when rotationAxis changes
      const animationName = rotationAxis
        ? `rotate${rotationAxis.toUpperCase()}`
        : "";
      if (animationName) {
        boxRef.current.playAnimation(animationName, false);
      }
    }
  }, [rotationAxis]);

  const handleDrag = (newPosition) => {
    setPosition(newPosition);
  };

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" />
      <ViroBox
        ref={boxRef}
        width={2}
        height={2}
        length={2}
        position={position}
        scale={[0.3, 0.3, 0.3]}
        materials={["wood"]}
        onDrag={handleDrag}
      />
    </ViroARScene>
  );
};

export default Sceondscene;
