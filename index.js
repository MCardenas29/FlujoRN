/**
 * @format
 */

import './gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'A props object containing a "key" prop is being spread into JSX',
]);

AppRegistry.registerComponent(appName, () => () => (
  <PaperProvider>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </PaperProvider>
));
