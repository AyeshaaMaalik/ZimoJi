import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './StackScreens/Splash';
import Main from './StackScreens/Main';
import CameraPermission from './Drawer/CameraPermission';
import Splash2 from './StackScreens/Splash2';
import ThemeScreen from './StackScreens/ThemeScreen';
import CameraPermission2 from './Drawer/CameraPermission2';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Theme" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Main" component={Main} /> 
        <Stack.Screen name="Permission" component={CameraPermission2} /> 
        <Stack.Screen name="Permission2" component={CameraPermission} /> 
        <Stack.Screen name="Splash2" component={Splash2} />
        <Stack.Screen name="Theme" component={ThemeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
