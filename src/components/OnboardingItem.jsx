import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useRef } from "react";
import { Colors } from "../constants/Colors";

export default OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={item.img}
        style={[styles.image, { width, resizeMode: "contain" }]}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: 37,
    width: "100%",
    height: 400,
  },
  title: {
    fontSize: 27,
    fontFamily: "crimson-bold",
    textAlign: "center",
    marginHorizontal: 35,
    color: Colors.btnBlack,
    fontWeight:'600',
    marginBottom:10,
  },
  text: {
    fontSize: 19,
    fontFamily: "crimson",
    textAlign: "center",
    color: Colors.grayText,
    marginHorizontal: 40,
    marginBottom: 20,
  },
});
