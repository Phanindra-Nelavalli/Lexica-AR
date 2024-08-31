import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home";
import ArCam from "./src/screens/ArCam";
import Cube from "./src/screens/Cube";
import Welcome from "./src/screens/Welcome";
import Onboarding from "./src/screens/Onboarding";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import Role from "./src/screens/Role";
import EmailVerify from "./src/screens/EmailVerify";
import FacultyUploadScreen from "./src/screens/FacultyUploadScreen";
import ARDetection from "./src/screens/ARDetection";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cube" component={Cube} />
        <Stack.Screen name="ArCam" component={ArCam} />
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
        <Stack.Screen name="ARDetection" component={ARDetection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
