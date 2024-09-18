/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainScreen from './screens/main/Screen';
import SettingsScreen from './screens/settings/Screen';
import {createStackNavigator} from '@react-navigation/stack';
import {AppStackPraramList} from './types';

const Stack = createStackNavigator<AppStackPraramList>();

function App() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={MainScreen} />

      {/* Screens with header */}
      <Stack.Group screenOptions={{headerShown: true}}>
        <Stack.Screen name="Configuracion" component={SettingsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default App;
