import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Role = () => {
  const navigation = useNavigation();
  const onStudentLogin = () => {
    navigation.navigate("SignIn"); 
  };

  const onFacultyLogin = () => {
    navigation.navigate("FacultyLogin"); 
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/intro.png")}
        style={styles.introImage}
      />
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
            source={require("../assets/images/faculty.png")}
            style={styles.faculty}
          />
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Faculty</Text>
          </Pressable>
        </View>
        <View style={styles.card}>
          <Image
            source={require("../assets/images/student.png")}
            style={styles.student}
          />
          <Pressable style={styles.button} onPress={onStudentLogin}>
            <Text style={styles.buttonText}>Student</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Role;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFBDB",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  introImage: {
    width: 750,
    height: 450,
    margin: 40,
    resizeMode: "contain",
    marginBottom: 0,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginHorizontal: 20,
  },
  faculty: {
    width: 130,
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  student: {
    width: 130,
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
