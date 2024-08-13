import React, {useState} from 'react'
import { StyleSheet } from 'react-native'
import { ViroARScene,
     ViroText,
      ViroARSceneNavigator,
       ViroAmbientLight,
    ViroBox,
    ViroMaterials,
ViroAnimations } from '@reactvision/react-viro'


const Sceondscene=()=>{

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


    return(
    <ViroARScene>
        <ViroAmbientLight color='#000000'/>
        
        {/* <ViroText
            text={"LEXICA_AR"}
            position={[0,-1,-5]}
            style={{fontSize:50, color:'red'}}
            
        /> */}
        <ViroBox
            width={2}
            height={2}
            length={2}
            position={[0,-1,-2]}
            scale={[0.2,0.2,0.2]}
            materials={["wood"]}
            animation={{name:'rotate',loop:true, run:true}}
            
        />
    </ViroARScene>
    );
}



const Cube = () => {
  return (
    <ViroARSceneNavigator
    initialScene={{
        scene:Sceondscene
    }}
    style={{flex:5}}
    />
  )
}
var styles=StyleSheet.create(
    {
      
    }
);
export default Cube
