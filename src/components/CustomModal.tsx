import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  GestureResponderEvent,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import Theme from '../utils/theme';
import {moderateScale} from '../helpers/Metrics';
import Slider from '@react-native-community/slider';
import { useAppDispatch } from '../redux/store/hooks';
import { filterData } from '../redux/features/DataSlice';

interface ModalProps {
  isVisible: boolean;
  closeModal: ((event: GestureResponderEvent) => void) | undefined;
}

const CustomModal = (props: ModalProps) => {
    const dispatch = useAppDispatch();
  const [xValue, setxValue] = useState(0);
  const [yValue, setyValue] = useState(0);

  const handleCloseModal = () => {
    dispatch(filterData({xValue, yValue}));
    props.closeModal();
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Filter Props</Text>
            <Text style={styles.modalText}>X Value: {xValue}</Text>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={40}
              minimumTrackTintColor={Theme.PRIMARY_ACTIVE_COLOR}
              maximumTrackTintColor={Theme.PRIMARY_COLOR}
              onValueChange={value => setxValue(value)}
              value={xValue}
            />

            <Text style={styles.modalText}>Y Value: {yValue}</Text>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={40}
              minimumTrackTintColor={Theme.PRIMARY_ACTIVE_COLOR}
              maximumTrackTintColor={Theme.PRIMARY_COLOR}
              onValueChange={value => setyValue(value)}
              value={yValue}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleCloseModal()}>
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={props.closeModal}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export {CustomModal};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Theme.SECONDARY_COLOR,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: Theme.PRIMARY_ACTIVE_COLOR,
    margin: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: moderateScale(16),
    color: Theme.PRIMARY_COLOR,
  },
});
