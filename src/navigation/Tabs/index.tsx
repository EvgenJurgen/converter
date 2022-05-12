import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ConverterScene} from '../../scenes/ConverterScene';
import {ExchangeRateScene} from '../../scenes/ExchangeRateScene';
import {HomeScene} from '../../scenes/HomeScene';
import {Image, View} from 'react-native';
import {styleImage, styles} from './styles';

const Tab = createBottomTabNavigator();

export const HOME_SCENE_NAME = 'Home';
export const EXCHANGE_RATE_SCENE_NAME = 'Exchange Rate';
export const CONVERTER_SCENE_NAME = 'Converter';

const scenes = [
  {name: HOME_SCENE_NAME, component: HomeScene, iconSource: require('../../assets/images/home.png')},
  {
    name: EXCHANGE_RATE_SCENE_NAME,
    component: ExchangeRateScene,
    iconSource: require('../../assets/images/exchangeRate.png'),
  },
  {
    name: CONVERTER_SCENE_NAME,
    component: ConverterScene,
    iconSource: require('../../assets/images/converter.png'),
  },
];

export const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarLabel: '', headerShown: false}}>
      {scenes.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tapBar}>
                <Image source={item.iconSource} style={styleImage(focused).image} key={item.name} />
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
