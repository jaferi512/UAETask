import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConnectionError = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Connection Error</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 16
  }
});

export {ConnectionError};
