import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackNavigatorParamList } from '../types/NavigationType';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { MainListing, WeatherDetails } from '../activities';

const AppNavigation = () => {
    const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();
  return (
    <NavigationContainer>
        <SafeAreaView style={{flex:1}}>
        <Stack.Navigator>
      <Stack.Screen
        name="MAINLISTING"
        component={MainListing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WEATHERDETAIL"
        component={WeatherDetails}
        options={{ headerShown: false }}
      />
      </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export {AppNavigation};
