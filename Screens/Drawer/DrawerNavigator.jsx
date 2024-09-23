import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Scan from './Scan';
import ScanImage from './ScanImage';
import History from './History';
import Favorites from './Favorites';
import Contacts from './Contact';
import ChooseLogo from './ChooseLogo';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
      <Drawer.Navigator initialRouteName="Scan">
        <Drawer.Screen name="Scan" component={Scan} />
        <Drawer.Screen name="Scan Image" component={ScanImage} />
        <Drawer.Screen name="History" component={History} />
        <Drawer.Screen name="Favorites" component={Favorites} />
        <Drawer.Screen name="Contacts" component={Contacts} />
        <Drawer.Screen name="Choose Application Logo" component={ChooseLogo} />
      </Drawer.Navigator>
  );
};

export default DrawerNavigator;
