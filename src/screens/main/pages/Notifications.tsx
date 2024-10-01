import {AppTabScreenProps} from '@/types';
import database, {DataSnapshot} from '@react-native-firebase/database';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {BarChart, barDataItem} from 'react-native-gifted-charts';
import {Appbar, Card, Icon, Text, useTheme} from 'react-native-paper';
import {View, ScrollView} from 'react-native';

const n = Math.round(Math.random() * 100);
function Notifications({navigation}: AppTabScreenProps<'Notificaciones'>) {
  console.log(n);
  return (
    <ScrollView style={{flex: 1, gap: 10}}>
      {[...Array(n)].map((e, i) => (
        <Card>
          <Card.Title title={`Prueba ${i}`} />
          <Card.Content>
            <Text>Esta es una prueba</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

export default Notifications;
