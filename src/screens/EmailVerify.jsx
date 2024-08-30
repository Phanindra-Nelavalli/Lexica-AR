import { sendEmailVerification } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { openInbox } from "react-native-email-link";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { auth } from "./../Configs/firebase";
import { useRoute, useNavigation } from "@react-navigation/native";

const EmailVerify = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const openEmailApp = () => {
    openInbox();
  };

  const handleResendEmail = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        await sendEmailVerification(user);
        Alert.alert("Resend email", `Verification email sent to ${user.email}`);
        setCanResend(false);
        setTimer(30); // Set timer to 30 seconds
      } catch (error) {
        console.error("Error resending email:", error);
        Alert.alert("Error", "An error occurred while resending the email.");
      }
    } else {
      Alert.alert("Error", "User not found.");
    }
  };

  useEffect(() => {
    let interval = null;

    if (!canResend && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer, canResend]);

  useEffect(() => {
    const checkEmailVerification = async () => {
      const user = auth.currentUser;

      if (user) {
        await user.reload();
        if (user.emailVerified) {
          navigation.navigate("Home");
        }
      }
    };

    const verificationInterval = setInterval(checkEmailVerification, 1000);

    return () => clearInterval(verificationInterval);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/email-verification.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.message}>
        We have sent a verification email to your registered email address.
        Please check your inbox and follow the instructions to verify your
        account.
      </Text>

      <TouchableOpacity style={styles.btn} onPress={openEmailApp}>
        <MaterialIcons name="email" size={24} color="#fff" />
        <Text style={styles.btnText}>Go to Email App</Text>
      </TouchableOpacity>

      <Text style={styles.alternate}>
        Didn't receive the email?{"\n"}
        {canResend ? (
          <Text style={styles.resendLink} onPress={handleResendEmail}>
            Resend Email
          </Text>
        ) : (
          <Text style={styles.resendText}>
            Resend available in {timer} seconds
          </Text>
        )}
      </Text>
    </View>
  );
};

export default EmailVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  alternate: {
    fontSize: 16,
    color: "#666",
  },
  resendLink: {
    color: "#1E90FF",
    fontWeight: "bold",
  },
  resendText: {
    color: "#666",
    fontWeight: "bold",
  },
});
