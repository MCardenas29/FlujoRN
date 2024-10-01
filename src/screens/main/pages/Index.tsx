import {AppTabScreenProps} from '@/types';
import database, {DataSnapshot} from '@react-native-firebase/database';
import React, {useCallback, useEffect, useState} from 'react';
import {BarChart, barDataItem} from 'react-native-gifted-charts';
import {Appbar, Card, Icon, Text, useTheme} from 'react-native-paper';
import {CA} from '../../../data/bills.json';
import {useWindowDimensions, View} from 'react-native';

const colors = [
  '#69BCD1',
  '#D1C869',
  '#D1698D',
  '#67787C',
  '#57543C',
  '#524147',
];

function Usage({navigation}: AppTabScreenProps<'Inicio'>) {
  const theme = useTheme();
  const flowRef = database().ref('/flujo').startAt(null, '1726449700');
  const [usage, setUsage] = useState(-1);
  const [price, setPrice] = useState(0);
  const [lastVal, setLastVal] = useState(0);
  let currentFee = CA.fees[0];

  const onValue = useCallback((snapshot: DataSnapshot) => {
    if (usage < 0) {
      return;
    }
    let val = snapshot.val();
    setUsage(val + usage);
    setLastVal(val);
  }, []);

  useEffect(() => {
    (async () => {
      const values = (await flowRef.once('value')).val();
      let ri = 0;
      let p = 0;

      let sum = 0;
      for (let t in values) {
        currentFee =
          ri in CA.range && sum > CA.range[ri] ? CA.fees[++ri] : currentFee;

        sum += values[t];
        p += values[t] * currentFee;
      }

      setUsage(sum);
      setPrice(p);
    })();

    flowRef.on('child_added', onValue);
    return () => {
      flowRef.off('child_added', onValue);
    };
  });

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
      <Card style={{margin: 10}}>
        <Card.Content style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Icon source="water" size={20} />
          <Text>{usage.toFixed(2)} m³</Text>
        </Card.Content>
        <Card.Content>
          <Text style={{...theme.fonts.headlineMedium, fontWeight: 'bold'}}>
            $ {price.toFixed(2)}
          </Text>
        </Card.Content>
        <Card.Content>
          <Text style={{...theme.fonts.labelLarge, fontWeight: 'bold'}}>
            Tarifa: {CA.name}
          </Text>
        </Card.Content>
      </Card>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
        <Text>Graficas de consumo</Text>
        <UsageLine usage={usage} />
      </View>
    </>
  );
}

function UsageLine({usage}) {
  let dimensions = useWindowDimensions();
  let bars: barDataItem[] = [];

  for (let i in CA.range) {
    if (usage < 1) break;
    let bar: barDataItem = {
      label: CA.range[i].toString(),
      value: 0,
      frontColor: colors[i],
    };

    bar.value = usage >= CA.range[i] ? CA.range[i] : usage;
    usage -= CA.range[i];
    bars.push(bar);
  }

  if (usage > 0) {
    bars.push({
      label: 'E',
      value: usage,
      frontColor: colors[colors.length - 1],
    });
  }

  return (
    <BarChart
      frontColor="lightgray"
      data={bars}
      width={dimensions.width}
      xAxisThickness={0}
      yAxisThickness={0}
      dashWidth={0}
      maxValue={CA.range[CA.range.length - 1]}
      adjustToWidth
    />
  );
}

export default Usage;
