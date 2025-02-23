import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import FragnifiqueScreen from './screens/FragnifiqueScreen';
import AdminScreen from './screens/admin/AdminScreen';
import ProductCrudScreen from './screens/admin/ProductCrudScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegisterScreen">
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="FragnifiqueScreen" component={FragnifiqueScreen} options={{ title: 'Fragnifique' }} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ title: 'Admin Dashboard' }} />
        <Stack.Screen name="ProductCrudScreen" component={ProductCrudScreen} options={{ title: 'Manage Products' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}