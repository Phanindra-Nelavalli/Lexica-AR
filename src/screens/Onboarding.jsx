import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import OnboardingItem from './../components/OnboardingItem';
import Slides from './../components/Slides';
import Paginator from './../components/Paginator';
import NextButton from './../components/NextButton';



export default function Onboarding() {

  

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  useEffect(() => {
    console.log('Current Index:', currentIndex);
  }, []);

  const scrollToNext=()=>{
    if(currentIndex < Slides.length -1){
      slidesRef.current.scrollToIndex({index:currentIndex+1});
    }else{
      console.log("Last Page/Item.")
    }
  }

  const handleSkip =() =>{
    slidesRef.current.scrollToIndex({index:Slides.length-1});
  }

  return (
    <View style={[styles.container]}>
      <View style={{backgroundColor:Slides[currentIndex].backgroundColor}}>
        <FlatList
          data={Slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        <Paginator data={Slides} scrollX={scrollX} />
        <NextButton scrollX={scrollX} scrollToNext={scrollToNext} handleSkip={handleSkip} isLastSlide={currentIndex === Slides.length - 1}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});
