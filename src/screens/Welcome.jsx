import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "./../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { auth } from "./../Configs/firebase";

const Welcome = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const user = auth.currentUser;
      console.log(user); 
      if (!user) {
        navigation.navigate("Onboarding");
      } else {
        navigation.navigate("Home");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/ar.png")}
        style={styles.arImage}
      />
      <Image
        source={require("./../assets/images/wel.png")}
        style={styles.welcomeImage}
      />
      <Text style={styles.subtitle}>TO</Text>
      <Text style={styles.subtitle}> LEXICA AR</Text>
      <Text style={styles.description}>Re-imagine Learning</Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcomeImage: {
    width: 300,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  arImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 30,
    color: Colors.btnBlack,
    fontWeight: "500",
    textShadowColor: "#fff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 22,
    fontFamily: "sans-serif-light",
    fontWeight: "400",
    color: Colors.btnBlack,
    textShadowColor: "#fff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginTop: 10,
  },
});
