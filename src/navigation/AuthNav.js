import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/authScreens/LoginScreen';
import SignupScreen from '../screens/authScreens/SignUpScreen';
import DashboardScreen from '../screens/MainScreens/DashboardScreen';
import SplashScreen from '../screens/authScreens/SplashScreen';

const Stack = createStackNavigator();

const AuthNav = () => {
  return (
    <Stack.Navigator initialRouteName = "splash"  screenOptions={{headerShown: false}} >
     <Stack.Screen
     name = "splash"
     component={SplashScreen}
/>

      <Stack.Screen
        name="login"
        component={LoginScreen}
        
      />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        
      />
       <Stack.Screen
        name="dashBoard"
        component={DashboardScreen}
        
      />
    </Stack.Navigator>
  );
};

export default AuthNav;