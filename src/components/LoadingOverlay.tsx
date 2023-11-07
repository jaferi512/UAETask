import React from 'react';
import { Modal, StyleSheet, View, ActivityIndicator, Text } from 'react-native';

interface FillButtonProps {
    isLoading: boolean;
    message: string;
  }

const LoadingOverlay = (props: FillButtonProps) => {
  return (
    <Modal visible={props.isLoading} transparent={true}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="large" color="#0000ff" />
          {props.message && <Text style={styles.message}>{props.message}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export {LoadingOverlay};