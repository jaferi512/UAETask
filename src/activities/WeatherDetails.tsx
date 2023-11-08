import { Button, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Theme from '../utils/theme';
import { CommonHeader, LoadingOverlay } from '../components';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { getWeather } from '../redux/features/WeatherSlice';
import WeatherCard from '../components/WeatherCard';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackNavigatorParamList} from '../../types/NavigationType';

const WeatherDetails = () => {
    const dispatch = useAppDispatch();
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackNavigatorParamList>>();
    const weatherData = useAppSelector(state => state.weather.data);
    const loading = useAppSelector(state => state.weather.loading);

    useEffect(() => {
        dispatch(getWeather());
    },[]);
  return (
    <View style={styles.main_container}>
        <CommonHeader name='Weather Details' />
        <WeatherCard data={weatherData && weatherData} />
        <Button title='Back' onPress={() => navigation.pop()} />
        <LoadingOverlay isLoading={loading} message="Loading..." />
    </View>
  )
}

export {WeatherDetails};

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Theme.PRIMARY_COLOR,
      },
})