import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './StackScreens/Splash';
import Main from './StackScreens/Main';
import CameraPermission from './Drawer/CameraPermission';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Main" component={Main} /> 
        <Stack.Screen name="Permission" component={CameraPermission} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
