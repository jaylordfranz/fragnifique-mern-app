import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import InputField from '../components/InputField'; // Make sure this component is implemented

const API_URL = 'http://192.168.8.36:5000/api/auth'; // Replace with your local IP

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      Alert.alert('Welcome Admin', 'Redirecting to Admin Screen');
      navigation.navigate('AdminScreen');
      return;
    }

    try {
      console.log('Sending data:', { email, password }); // Debugging
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.status === 200) {
        Alert.alert('Success', 'Login successful');
        navigation.navigate('FragnifiqueScreen');
      }
    } catch (error) {
      console.error('Error details:', error); // Full error log
      const errorMessage = error.response?.data?.message || 'Invalid credentials';
      Alert.alert('Error', errorMessage);
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LoginScreen;