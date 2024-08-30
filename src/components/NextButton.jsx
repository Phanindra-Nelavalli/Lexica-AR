import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function NextButton({ scrollToNext, handleSkip, isLastSlide }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {!isLastSlide ? (
        <>
          <TouchableOpacity style={styles.btnSkip} onPress={handleSkip}>
            <Text style={styles.btnText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnNext} onPress={scrollToNext}>
            <Text style={styles.btnTextN}>Next</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={styles.btnNext}
          onPress={() => navigation.navigate("Role")}
        >
          <Text style={styles.btnTextN}>Get Started</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 25,
  },
  btnTextN: {
    fontSize: 20,
    color: "white",
    fontWeight: "400",
  },
  btnText: {
    fontSize: 20,
    color: Colors.btnBlack,
    fontWeight: "400",
  },
  btnNext: {
    backgroundColor: Colors.btnBlack,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: Colors.btnBlack,
    borderWidth: 3,
  },
  btnSkip: {
    color: Colors.btnBlack,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: Colors.btnBlack,
    borderWidth: 3,
    borderRadius: 5,
  },
});
