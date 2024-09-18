import React from 'react';
import {AppTabParamList} from '@/types';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Index from './pages/Index';

const Tab = createMaterialBottomTabNavigator<AppTabParamList>();

function Main() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Inicio"
        options={{tabBarIcon: 'home-analytics'}}
        component={Index}
      />
      <Tab.Screen
        name="Uso"
        options={{tabBarIcon: 'chart-line'}}
        children={() => <></>}
      />
      <Tab.Screen
        name="Notificaciones"
        children={() => <></>}
        options={{tabBarIcon: 'bell'}}
      />
    </Tab.Navigator>
  );
}

export default Main;
