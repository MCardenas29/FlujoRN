import {AppTabScreenProps} from '@/types';
import database, {DataSnapshot} from '@react-native-firebase/database';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {BarChart, barDataItem} from 'react-native-gifted-charts';
import {Appbar, Card, useTheme} from 'react-native-paper';

function Index({navigation}: AppTabScreenProps<'Inicio'>) {
  const theme = useTheme();
  const insets =
    (Style.GraphContainer.margin + Style.GraphContainer.padding) * 2;
  const [w, setW] = useState(0);

  return (
    <>
      <Appbar.Header mode="medium">
        <Appbar.Content
          title="Bienvenido"
          titleStyle={theme.fonts.headlineLarge}
        />
        <Appbar.Action
          icon="account-circle-outline"
          onPress={() => navigation.navigate('Configuracion')}
        />
      </Appbar.Header>
      <Card
        style={Style.GraphContainer}
        onLayout={e => setW(e.nativeEvent.layout.width)}>
        <UsageChart width={w} insets={insets} />
      </Card>
    </>
  );
}

const Style = StyleSheet.create({
  GraphContainer: {margin: 10, padding: 20},
});

type UsageProps = {
  width: number;
  insets: number;
};

function UsageChart({width, insets}: UsageProps) {
  const [usage, setUsage] = useState(0);
  const flowRef = database().ref('/flujo').startAt(null, '1725170400');
  let data: barDataItem[] = [];

  const onValue = useCallback((snapshot: DataSnapshot) => {
    let sum = 0;
    snapshot.forEach(e => (sum += e.val()));
    setUsage(sum);
  }, []);

  useEffect(() => {
    flowRef.keepSynced(true);
    console.log('====================================');
    flowRef.on('value', onValue);
    return () => {
      flowRef.off('value', onValue);
      flowRef.keepSynced(false);
    };
  }, []);

  useEffect(() => {}, [usage]);
  console.log(width, insets);

  return width > 0 ? (
    <BarChart
      data={data}
      parentWidth={width - insets}
      adjustToWidth
      maxValue={1}
    />
  ) : null;
}

export default Index;
