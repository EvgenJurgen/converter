import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AboutAppScene } from '../../scenes/AboutApp';
import { Tabs } from '../Tabs';

const ABOUT_APP_SCREEN_NAME = 'About App';
const TABS_NAVIGATION_NAME = 'App';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name={TABS_NAVIGATION_NAME} component={Tabs} />
      <Drawer.Screen name={ABOUT_APP_SCREEN_NAME} component={AboutAppScene} />
    </Drawer.Navigator>
  );
};
