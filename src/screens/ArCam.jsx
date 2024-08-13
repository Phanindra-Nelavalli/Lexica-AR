// App.tsx
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { 
  ViroARScene, 
  Viro3DObject, 
  ViroARSceneNavigator, 
  ViroAmbientLight, 
  ViroARTrackingTargets, 
  ViroARImageMarker, 
  ViroMaterials,ViroAnimations
} from "@reactvision/react-viro";

const HelloWorldSceneAR = () => {

  ViroMaterials.createMaterials({
    wood:{diffuseTexture:require('./../assets/wood.jpeg')}
});

ViroAnimations.registerAnimations({
  rotate:{
      duration:2500,
      properties:{
          rotateY:'+=90'
      }
  }
})

  const [text, setText] = useState('Initializing AR...');

  ViroARTrackingTargets.createTargets({
    myimage: {
      source: require('./../assets/my.jpg'),
      orientation: 'up',
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
         // position={[0,-1,-2]}
          type="OBJ"
          materials={["wood"]}
          animation={{name:'rotate',loop:true, run:true}}
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
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  )
}
const styles = StyleSheet.create({
    f1: {
      flex: 1
    }
  });
export default ArCam
