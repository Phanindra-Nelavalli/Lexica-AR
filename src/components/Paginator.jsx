import { StyleSheet, Text, useWindowDimensions,Animated, View } from 'react-native'
import React from 'react'

const Paginator = ({data,scrollX}) => {
    const {width} = useWindowDimensions();

  return (
    <View style={[styles.container,{flexDirection:'row',height:50}]}>
      {data.map((_,i)=>{
        const inputRange = [(i-1)*width,i*width,(i+1)*width]

        const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange:[10,20,10],
            extrapolate:'clamp'
        })
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange:[0.3,1,0.3],
            extrapolate:'clamp'
        })

        return <Animated.View style={[styles.dot,{width:dotWidth,opacity}]} key={i.toString()} />
      })}
    </View>
  )
}

export default Paginator

const styles = StyleSheet.create({
    container:{
        flex:0.5,
        justifyContent:'center',
        alignItems:'center',
    },
    
    dot:{
        height:10,
        borderRadius:5,
        backgroundColor:'#191D21',
        marginHorizontal:8
    }
})