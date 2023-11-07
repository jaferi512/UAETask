import React from 'react';
import {AppNavigation} from './src/navigation/AppNavigation';
import {store} from './src/redux/store/store';
import {Provider} from 'react-redux';
import { Platform, StatusBar } from 'react-native';
import Theme from './src/utils/theme';

const App = () => {
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
