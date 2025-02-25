import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import InputField from '../components/InputField'; // Make sure this component is implemented
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin component

const API_URL = 'http://192.168.100.33:5000/api/auth'; // Replace with your local IP

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle Google Login
  const handleGoogleLogin = async (response) => {
    if (response?.credential) {
      const { credential } = response;
      console.log("Google login token:", credential);

      try {
        const res = await axios.post(`${API_URL}/google-login`, { token: credential });
        Alert.alert('Success', res.data.message);
        navigation.navigate('FragnifiqueScreen');
      } catch (error) {
        console.error("Error during Google login:", error);
        Alert.alert('Error', 'Google login failed');
      }
    }
  };

  // Handle Normal Login
  const handleLogin = async () => {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      navigation.navigate('AdminScreen');
      return;
    }
    
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      if (response.status === 200) {
        Alert.alert('Success', 'Login successful');
        navigation.navigate('FragnifiqueScreen');
      }
    } catch (error) {
      console.error('Error details:', error);
      const errorMessage = error.response?.data?.message || 'Invalid credentials';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <GoogleLogin 
        onSuccess={handleGoogleLogin}
        onError={() => Alert.alert('Error', 'Google login failed')}
      />

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