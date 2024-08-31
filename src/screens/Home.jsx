import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { auth } from "./../Configs/firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out Successfully");
        navigation.replace("SignIn");
      })
      .catch((error) => {
        console.log("An error happened");
      });
  };

  return (
    <View style={styles.container}>
      <Button title="AR Camera" onPress={()=>navigation.navigate("ARDetection")} />
      <Button title="Sample" />
      <Button title="Sign Out" onPress={() => onSignOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
});

export default Home;
