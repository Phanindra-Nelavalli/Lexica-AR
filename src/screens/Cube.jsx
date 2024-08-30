import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import Sceondscene from "./Sceondscene";

const Cube = () => {
  const [rotationAxis, setRotationAxis] = useState(null);

  const handleButtonPress = (axis) => {
    setRotationAxis(axis);
    setTimeout(() => {
      setRotationAxis(null); 
    }, 2000); 
  };

  return (
    <View style={{ flex: 1 }}>
      <ViroARSceneNavigator
        initialScene={{
          scene: () => <Sceondscene rotationAxis={rotationAxis} />,
        }}
        style={{ flex: 1 }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("X")}
        >
          <Text style={styles.buttonText}>Rotate X</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Y")}
        >
          <Text style={styles.buttonText}>Rotate Y</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Z")}
        >
          <Text style={styles.buttonText}>Rotate Z</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default Cube;
