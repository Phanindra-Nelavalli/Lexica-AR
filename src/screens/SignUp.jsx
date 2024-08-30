import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "./../constants/Colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "./../Configs/firebase";

const SignUp = () => {
  const navigation = useNavigation();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onCreateAccount = () => {
    if (!email && !password && !fullname) {
      ToastAndroid.show(
        "Please Enter All Details!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      return;
    }

    // Firebase authentication code goes here
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await sendEmailVerification(user);
        console.log(user.email, user.password,user);
        navigation.replace("EmailVerify");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.centeredContainer}>
          <Image
            source={require("./../assets/images/studentrbg.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Student Registration</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullname}
            onChangeText={setFullname}
            placeholder="Enter Your Full Name"
            placeholderTextColor={Colors.white}
          />
          <Text style={styles.label}>Email-Id</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Your College Email Id"
            placeholderTextColor={Colors.white}
          />
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={secureTextEntry}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Your Password"
              placeholderTextColor={Colors.white}
              style={styles.passwordInput}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.icon}
            >
              <MaterialIcons
                name={secureTextEntry ? "visibility" : "visibility-off"}
                size={24}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn} onPress={onCreateAccount}>
            <Text style={styles.btnText}>Create New Account</Text>
          </TouchableOpacity>
          <Text style={styles.alternate}>
            Already have an account?{" "}
            <Text
              onPress={() => navigation.navigate("SignIn")}
              style={styles.signIn}
            >
              Sign in
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DarkYellow,
  },
  centeredContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 33,
    fontFamily: "outfit-bold",
    marginTop: 15,
    color: Colors.DarkBlue,
  },
  formContainer: {
    padding: 25,
    borderRadius: 29,
    width: "100%",
    backgroundColor: Colors.DarkBlue,
    height: "100%",
  },
  label: {
    fontSize: 17,
    marginHorizontal: 15,
    marginBottom: 5,
    color: Colors.DarkYellow,
    fontFamily: "outfit-medium",
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    margin: 15,
    fontFamily: "outfit",
    marginTop: 8,
    borderColor: Colors.white,
    fontSize: 14,
    color: Colors.white,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    margin: 15,
    marginTop: 1,
    borderColor: Colors.white,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontFamily: "outfit",
    fontSize: 14,
    color: Colors.white,
  },
  icon: {
    padding: 15,
  },
  btn: {
    backgroundColor: Colors.DarkYellow,
    padding: 10,
    borderRadius: 99,
    marginHorizontal: 15,
    marginTop: 30,
  },
  btnText: {
    fontSize: 17,
    fontFamily: "outfit-medium",
    textAlign: "center",
    color: Colors.DarkBlue,
  },
  alternate: {
    fontSize: 17,
    fontFamily: "outfit-medium",
    textAlign: "center",
    color: Colors.white,
    marginTop: 15,
  },
  signIn: {
    color: Colors.DarkYellow,
    fontSize: 17,
  },
  contentContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
