import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {MaterialBottomTabScreenProps} from 'react-native-paper';

export type AppStackPraramList = {
  Main: NavigatorScreenParams<AppTabParamList>;
  Configuracion: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackPraramList> =
  StackScreenProps<AppStackPraramList, T>;

export type AppTabParamList = {
  Inicio: undefined;
  Uso: undefined;
  Notificaciones: undefined;
};

export type AppTabScreenProps<T extends keyof AppTabParamList> =
  CompositeScreenProps<
    MaterialBottomTabScreenProps<AppTabParamList, T>,
    AppStackScreenProps<keyof AppStackPraramList>
  >;
