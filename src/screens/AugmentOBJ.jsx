import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARImageMarker,
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
} from "@reactvision/react-viro";

const AugmentOBJ = () => {
  const HelloWorld = () => {
    ViroARTrackingTargets.createTargets({
      target1: {
        source: require("./../assets/images/my.jpg"),
        orientation: "Up",
        physicalWidth: 0.165,
      },
    });

    return (
      <ViroARScene>
        <ViroAmbientLight color="#ffffff" />
        <Viro3DObject
          source={require("./../assets/images/my.jpg")}
          scale={[0.25, 0.25, 0.25]}
          rotation={[-170, 0, 0]}
          type="OBJ"
        />
      </ViroARScene>
    );
  };

  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorld,
      }}
      style={styles.f1}
    />
  );
};

export default AugmentOBJ;

const styles = StyleSheet.create({
  f1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
