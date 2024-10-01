import {AppTabScreenProps} from '@/types';
import database, {DataSnapshot} from '@react-native-firebase/database';
import React, {useCallback, useEffect, useState} from 'react';
import {LineChart, lineDataItem} from 'react-native-gifted-charts';
import {Appbar, useTheme} from 'react-native-paper';
import {useWindowDimensions} from 'react-native';

function Usage({navigation}: AppTabScreenProps<'Uso'>) {
  const theme = useTheme();
  const flowRef = database().ref('/flujo').startAt(null, '1725170400');
  const onValue = useCallback((snapshot: DataSnapshot) => {}, []);
  const [points, setPoints] = useState<lineDataItem[]>([]);

  useEffect(() => {
    (async () => {
      const values = (await flowRef.once('value')).val();
      let p: lineDataItem[] = [];
      for (let t in values) {
        p.push({
          value: values[t],
          label: t,
        });
      }

      setPoints(p);
    })();

    flowRef.on('child_added', onValue);
    return () => {
      flowRef.off('child_added', onValue);
    };
  });

  console.log(points);
  return (
    <>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Uso" titleStyle={theme.fonts.headlineLarge} />
      </Appbar.Header>
      <UsageLine points={points} />
    </>
  );
}

function UsageLine({points}) {
  let dimensions = useWindowDimensions();

  return <LineChart data={points} color="blue" />;
}

export default Usage;
