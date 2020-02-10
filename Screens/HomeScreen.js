import React from 'react';
import DrawerScreen from './DrawerScreen';
import MainScreen from './MainScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {UserProvider} from '../Contexts/UserContext';
import {ProductProvider} from '../Contexts/ProuctContext';

const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <UserProvider>
      <ProductProvider>
        <Drawer.Navigator
          initialRouteName="MainScreen"
          drawerContent={DrawerScreen}>
          <Drawer.Screen name="MainScreen" component={MainScreen} />
        </Drawer.Navigator>
      </ProductProvider>
    </UserProvider>
  );
};
export default HomeScreen;
