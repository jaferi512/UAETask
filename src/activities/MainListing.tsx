import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonHeader, LoadingOverlay} from '../components';
import Theme from '../utils/theme';
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryLabel,
} from 'victory-native';
import {useAppDispatch, useAppSelector} from '../redux/store/hooks';
import MasterSocketsManager from '../SocketManager/master-socket-manager';
import {
  getSensors,
  receiveSocketData,
  receiveSocketStatus,
} from '../redux/features/DataSlice';
import {ConnectionError} from '../components/ConnectionError';
import DropDownPicker from 'react-native-dropdown-picker';

const MainListing = () => {
  const dispatch = useAppDispatch();
  const [initialZoomDomain, setInitialZoomDomain] = useState({x: [0, 5]});
  //states from redux to display data here
  const data = useAppSelector(state => state.main.data);
  const status = useAppSelector(state => state.main.socketStatus);
  const sensors = useAppSelector(state => state.main.sensors);
  const loading = useAppSelector(state => state.main.loading);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    sensors.map(item => ({
      label: item.name,
      value: item.id.toString(),
    })),
  );

  const resetZoom = () => {
    setInitialZoomDomain({x: [0, 5]});
  };

  useEffect(() => {
    //getting sensors from mock api
    dispatch(getSensors());
    //getting connection with Websocket
    MasterSocketsManager.getInstance().connect(onPayloadRecieved);
  }, []);

  //function for setting payload data to redux
  const onPayloadRecieved = data => {
    dispatch(receiveSocketStatus(true));
    dispatch(receiveSocketData(data));
  };

  return (
    <View style={styles.main_container}>
      <CommonHeader />
      <View style={styles.dropdown_contain}>
        <DropDownPicker
          open={open}
          value={value}
          items={items && items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <VictoryChart
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={initialZoomDomain}
          />
        }
        theme={VictoryTheme.material}>
        <VictoryLine
          style={{
            data: {stroke: '#c43a31'},
            parent: {border: '1px solid #ccc'},
          }}
          data={data}
          labels={({datum}) => datum.y} // Set label to display y value
          labelComponent={<VictoryLabel style={{fill: 'white'}} />} // Style label to be white
        />
        <VictoryBrushContainer brushDimension="x" brushDomain={{x: [0, 5]}} />
      </VictoryChart>
      <View style={styles.button_contain}>
        <Button title="Reset Zoom" onPress={() => resetZoom()} />
      </View>
      <LoadingOverlay isLoading={loading} message="Loading..." />
      {!status ? <ConnectionError /> : null}
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
});
