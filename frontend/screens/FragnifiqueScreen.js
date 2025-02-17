import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FragnifiqueScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fragnifique</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default FragnifiqueScreen;
