// App.tsx
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { 
  ViroARScene, 
  Viro3DObject, 
  ViroARSceneNavigator, 
  ViroAmbientLight, 
  ViroARTrackingTargets, 
  ViroARImageMarker 
} from "@reactvision/react-viro";

const HelloWorldSceneAR = () => {
  const [text, setText] = useState('Initializing AR...');

  ViroARTrackingTargets.createTargets({
    myimage: {
      source: require('./../assets/my.jpg'),
      orientation: 'down',
      physicalWidth: 0.03 // physical width in meters
    }
  });

  const anchorFound = () => {
    console.log("Anchor/image detected");
  };

  return (
    <ViroARScene>
      <ViroARImageMarker target="myimage" onAnchorFound={anchorFound}>
        <ViroAmbientLight color='#000000' />
        <Viro3DObject
          source={require('./../assets/Part3.obj')}
          scale={[0.008, 0.008, 0.008]}
          rotation={[-170, 0, 0]}
          type="OBJ"
        />
      </ViroARImageMarker>
    </ViroARScene>
  );
};

const ArCam = () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloStudents,
      }}
      style={styles.f1}
    />
  )
}
const styles = StyleSheet.create({
    f1: {
      flex: 2
    }
  });
export default ArCam
