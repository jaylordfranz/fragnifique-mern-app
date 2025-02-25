import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google'; // Import the new GoogleLogin component

const API_URL = 'http://192.168.100.33:5000/api/auth';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle Google Login
  const handleGoogleLogin = async (response) => {
    if (response?.credential) {
      const { credential } = response;
      console.log("Google login token:", credential); // Log the token
  
      try {
        // Send the Google token to the backend for validation and login/registration
        const res = await axios.post(`${API_URL}/google-login`, { token: credential });
        Alert.alert('Success', res.data.message);
      } catch (error) {
        console.error("Error during Google login:", error); // Log the error
        Alert.alert('Error', 'Google login failed');
      }
    }
  };  
  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_URL}/register`, { name, email, password });
      Alert.alert('Success', 'User registered successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Google Sign-In Button */}
      <GoogleLogin 
        onSuccess={handleGoogleLogin}
        onError={() => Alert.alert('Error', 'Google login failed')}
      />

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Register" onPress={handleRegister} />

      {/* Button to navigate to the LoginScreen */}
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginText}>Already have an account? Log in here.</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
  },
});

export default RegisterScreen;