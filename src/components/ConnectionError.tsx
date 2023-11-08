import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConnectionError = (props: {stat: boolean}) => {
  console.log(props.stat);
  return (
    <View style={[props.stat ? styles.container2 : styles.container]}>
      <Text style={styles.text}>{props.stat ? "Socket Connected" : "Socket Connection Error"}</Text>
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
  container2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green',
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
