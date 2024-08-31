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
  ViroAnimations
} from "@reactvision/react-viro";

const HelloWorldSceneAR = () => {
  const [position, setPosition] = useState([0, -1, -2]);
  const [currentAnimation, setCurrentAnimation] = useState('rotateX');

  ViroMaterials.createMaterials({
    wood: { diffuseTexture: require('./../assets/images/woodmat.jpeg') }
  });

  ViroAnimations.registerAnimations({
    rotateX: {
      duration: 3000,
      properties: { rotateX: '+=90' }
    },
    rotateY: {
      duration: 3000,
      properties: { rotateY: '+=90' }
    },
    rotateZ: {
      duration: 3000,
      properties: { rotateZ: '+=90' }
    
    }
  });

  const handleDrag = (newPosition) => {
    setPosition(newPosition);
  };

  const handleAnimationFinished = () => {
    const animations = ['rotateX', 'rotateY', 'rotateZ'];
    const nextIndex = (animations.indexOf(currentAnimation) + 1) % animations.length;
    setCurrentAnimation(animations[nextIndex]);
  };

  const anchorFound = () => {
    console.log("Anchor/image detected");
  };

  return (
    <ViroARScene>
      <ViroARImageMarker target="myimage" onAnchorFound={anchorFound}>
        <ViroAmbientLight color='#ffffff' />
        <Viro3DObject
          source={require('./../assets/Objects/Part3.obj')}
          scale={[0.009, 0.009, 0.009]}
          rotation={[100, 180, 180]}
          position={[0, 0, 0]}
          type="OBJ"
          onDrag={handleDrag}
          materials={["wood"]}
          animation={{
            name: currentAnimation,
            loop: false,
            run: true,
            onFinish: handleAnimationFinished
          }}
          
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
  );
}

const styles = StyleSheet.create({
  f1: {
    flex: 1
  }
});

export default ArCam;
