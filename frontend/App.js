// frontend/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import FragnifiqueScreen from './screens/FragnifiqueScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegisterScreen">
        {/* Register Screen */}
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ title: 'Register' }}
        />
        
        {/* Login Screen */}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />

        {/* Fragnifique Screen */}
        <Stack.Screen
          name="FragnifiqueScreen"
          component={FragnifiqueScreen}
          options={{ title: 'Fragnifique' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
