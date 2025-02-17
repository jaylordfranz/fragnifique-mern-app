import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import InputField from '../components/InputField';

const API_URL = 'http://192.168.100.33:5000/api/auth';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <InputField placeholder="Name" value={name} onChangeText={setName} />
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />
      <InputField
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
  loginText: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
  },
});

export default RegisterScreen;