import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home";
import AugmentOBJ from "./src/screens/AugmentOBJ";
import Welcome from "./src/screens/Welcome";
import Onboarding from "./src/screens/Onboarding";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import Role from "./src/screens/Role";
import EmailVerify from "./src/screens/EmailVerify";
import FacultyUploadScreen from "./src/screens/FacultyUploadScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AugmentOBJ"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AugmentOBJ" component={AugmentOBJ} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Role" component={Role} />
        <Stack.Screen name="EmailVerify" component={EmailVerify} />
        <Stack.Screen
          name="FacultyUploadScreen"
          component={FacultyUploadScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
