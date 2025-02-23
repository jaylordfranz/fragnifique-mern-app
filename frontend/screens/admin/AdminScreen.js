import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const AdminScreen = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.');
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>Welcome, Admin!</Text>
      
      <Button title="Manage Products" onPress={() => navigation.navigate('ProductCrudScreen')} />
      <Button title="Manage Users" onPress={() => navigation.navigate('UserManagementScreen')} />
      <Button title="View Reports" onPress={() => navigation.navigate('ReportsScreen')} />
      <Button title="Settings" onPress={() => navigation.navigate('AdminSettingsScreen')} />
      <Button title="Logout" color="red" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: 'gray',
  },
});

export default AdminScreen;