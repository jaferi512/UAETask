import React, { useEffect } from 'react';
import {AppNavigation} from './src/navigation/AppNavigation';
import {store} from './src/redux/store/store';
import {Provider} from 'react-redux';
import { Platform, StatusBar } from 'react-native';
import Theme from './src/utils/theme';
import notifee, { AuthorizationStatus } from '@notifee/react-native';

const App = () => {
  async function checkNotificationPermission() {
    const settings = await notifee.getNotificationSettings();
  
    if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permissions has been authorized');
    } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
      console.log('Notification permissions has been denied');
      notifee.requestPermission();
    }
  }

  useEffect(() => {
    checkNotificationPermission();
  },[]);
  return (
    <Provider store={store}>
      <StatusBar
        animated={true}
        backgroundColor={Theme.PRIMARY_COLOR}
        barStyle={Platform.OS == 'android' ? 'light-content' : 'dark-content'}
      />
      <AppNavigation />
    </Provider>
  );
};

export default App;
