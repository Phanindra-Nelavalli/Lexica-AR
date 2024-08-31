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
} from "@reactvision/react-viro";

const HelloWorldSceneAR = () => {
  const [position, setPosition] = useState([0, -1, -2]);

  ViroMaterials.createMaterials({
    wood: { diffuseTexture: require("./../assets/images/woodmat.jpeg") },
  });

  ViroAnimations.registerAnimations({
    rotateX: {
      properties: { rotateX: "+=90" },
    },
    rotateY: {
      duration: 3000,
      properties: { rotateY: "+=90" },
    },
    rotateZ: {
      duration: 3000,
      properties: { rotateZ: "+=90" },
    },
  });

  const handleAnimationFinished = () => {
    if (currentAnimation === "rotateX") {
      setCurrentAnimation("rotateY");
    } else if (currentAnimation === "rotateY") {
      setCurrentAnimation("rotateZ");
    } else {
      setCurrentAnimation("rotateX");
    }
  };

  const computeImageHash = async (imageData) => {
    try {
      const hash = md5(Buffer.from(imageData, "base64"));
      return hash;
    } catch (error) {
      console.error("Error computing hash for image:", error);
      return null;
    }
  };

  const fetchModelForImageHash = async (imageHash) => {
    try {
      const snapshot = await firestore
        .collection("mediaLinks")
        .where("imageHash", "==", imageHash)
        .get();

      if (!snapshot.empty) {
        const document = snapshot.docs[0].data();
      } else {
        console.log("No matching document found for the image hash.");
      }
    } catch (error) {
      console.error("Error fetching model data from Firestore:", error);
    }
  };

  const anchorFound = async (anchor) => {
    console.log("Anchor/image detected:", anchor);

    if (imageHash) {
    }
  };

  const fetchImageBase64 = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error fetching image data:", error);
      return null;
    }
  };

  return (
    <ViroARScene>
      <ViroARImageMarker target="myimage" onAnchorFound={anchorFound}>
        <ViroAmbientLight color="#ffffff" />
        {modelPath && (
          <Viro3DObject
            scale={[0.009, 0.009, 0.009]}
            rotation={[100, 180, 180]}
            position={[0, 0, 0]}
            type="OBJ"
            onDrag={(newPosition) => setPosition(newPosition)}
            materials={["wood"]}
            animation={{
              name: currentAnimation,
              loop: false,
            }}
          />
        )}
      </ViroARImageMarker>
    </ViroARScene>
  );
};

const ARDetection = () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
});

export default ARDetection;
