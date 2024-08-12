import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ArCam from './src/screens/ArCam'; // Adjust the path as needed

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ArCam">
        <Stack.Screen name="ArCam" component={ArCam} options={{ title: 'AR Camera' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
