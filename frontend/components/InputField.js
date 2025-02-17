// frontend/components/InputField.js
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const InputField = ({ placeholder, value, onChangeText, secureTextEntry }) => (
  <View style={styles.inputContainer}>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default InputField;
