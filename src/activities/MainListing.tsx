import {StyleSheet, View, Button, Dimensions, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonHeader, CustomModal, LoadingOverlay} from '../components';
import Theme from '../utils/theme';
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
} from 'victory-native';
import {useAppDispatch, useAppSelector} from '../redux/store/hooks';
import {getSensors, receiveSocketData} from '../redux/features/DataSlice';
import {ConnectionError} from '../components/ConnectionError';
import DropDownPicker from 'react-native-dropdown-picker';
import notifee, {EventType} from '@notifee/react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackNavigatorParamList} from '../../types/NavigationType';
import {useWebsocket} from '../SocketManager/useWebsocket';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainListing = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackNavigatorParamList>>();
  //states from redux to display data here
  const chartdata = useAppSelector(state => state.main.data);
  const sensors: any = useAppSelector(state => state.main.sensors);
  const loading = useAppSelector(state => state.main.loading);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const items = sensors.map(item => ({label: item.name, value: item.id}));
  //Custom Hook for socket.io. We can pass this from .env but currently passing directly here.
  const {connected, socket} = useWebsocket('http://192.168.1.3:3000');

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Deep Link test',
      body: 'Testing Notification For Redirecting',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
  //For Listening Server and getting random data
  socket?.on('randomData', payload => {
    // 'payload' contains the data sent from the server
    dispatch(receiveSocketData(payload));
  });

  useEffect(() => {
    //Fore redirecing user to required screen
    const unsubscribe = notifee.onForegroundEvent(async event => {
      if (event.type === EventType.PRESS) {
        const notification = await notifee.getDisplayedNotifications();
        navigation.navigate('WEATHERDETAIL');
      }
    });
    //getting sensors from mock api
    dispatch(getSensors());
    return () => {
      unsubscribe;
    };
  }, [socket]);

  return (
    <View style={styles.main_container}>
      <CommonHeader name="Dashboard" />
      <View style={styles.dropdown_contain}>
        <DropDownPicker
          open={open}
          value={value}
          items={items && items}
          setOpen={setOpen}
          setValue={setValue}
          placeholder="Select a Sensor"
          //setItems={setItems}
        />
      </View>
      <View style={styles.filtet_btn}>
        <TouchableOpacity onPress={() => openModal()}>
          <Icon name='filter' size={25} />
        </TouchableOpacity>
      </View>
      <VictoryChart
      height={Dimensions.get('screen').height/2}
        containerComponent={<VictoryZoomContainer allowPan={true} zoomDimension="x" />}
        theme={VictoryTheme.material}>
        <VictoryLine
          style={{
            data: {stroke: '#c43a31'},
            parent: {border: '1px solid #ccc'},
          }}
          animate={{
            duration: 2000,
            onLoad: {duration: 1000},
          }}
          data={chartdata}
        />
      </VictoryChart>
      <View style={styles.button_contain_Deep}>
        <Button
          title="Test Deep Link"
          onPress={() => onDisplayNotification()}
        />
      </View>
      <LoadingOverlay isLoading={loading} message="Loading..." />
      {!connected ? (
        <ConnectionError stat={false} />
      ) : (
        <ConnectionError stat={true} />
      )}
      <CustomModal isVisible={isModalVisible} closeModal={closeModal} />
    </View>
  );
};

export {MainListing};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.PRIMARY_COLOR,
  },
  dropdown_contain: {
    width: '80%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  button_contain: {
    width: '80%',
    alignItems: 'flex-end',
  },
  button_contain_Deep: {
    position: 'absolute',
    bottom: 50,
    width: '80%',
  },
  filtet_btn: {
    width:'80%', alignItems:'flex-end', marginTop: 20
  }
});
