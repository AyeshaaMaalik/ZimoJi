import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Scan from './Scan';
import ScanImage from './ScanImage';
import History from './History';
import Favorites from './Favorites';
import Contacts from './Contact';
import ChooseLogo from './ChooseLogo';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} style={styles.drawer}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../Assets/SplashWhite.png')} 
          style={styles.logo}
        />
      </View>
      <DrawerItemList {...props} />
      <View style={styles.footerSpacer} />
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          THIS APPLICATION IS DESIGNED TO BE USED
        </Text>
        <Text style={styles.footerText1}>
        EXCLUSIVELY WITH ZIMOJI'S.
        </Text>
        <Text style={styles.footerText}>
          COPYRIGHT © 2024 ZIMOJI | ZIMO GROUP LIMITED.
        </Text>
        <Text style={styles.footerText1}>
          ALL RIGHTS RESERVED.
        </Text>
        <Text style={styles.footerText}>
          TERMS | PRIVACY
        </Text>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Scan"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: '#000' }, 
        drawerLabelStyle: { color: '#fff' },
      }}
    >
      <Drawer.Screen 
        name="SCAN" 
        component={Scan} 
        options={{ 
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../Assets/Scan.png')}
              style={[styles.icon, { width: size * 1.5, height: size * 1.5 }]}
            />
          ),
        }} 
      />
      <Drawer.Screen 
        name="SCAN IMAGE" 
        component={ScanImage} 
        options={{ 
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../Assets/ScanImage.png')} 
              style={[styles.icon, { width: size * 1.5, height: size * 1.5 }]} 
            />
          ),
        }} 
      />
      <Drawer.Screen 
        name="HISTORY" 
        component={History} 
        options={{ 
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../Assets/History.png')} 
              style={[styles.icon, { width: size * 1.5, height: size * 1.5 }]} 
            />
          ),
        }} 
      />
      <Drawer.Screen 
        name="FAVOURITES" 
        component={Favorites} 
        options={{ 
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../Assets/Favourites.png')}
              style={[styles.icon, { width: size * 1.5, height: size * 1.5 }] }
            />
          ),
        }} 
      />
      <Drawer.Screen 
        name="CONTACT" 
        component={Contacts} 
        options={{ 
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../Assets/Contact.png')} 
              style={[styles.icon, { width: size * 1.5, height: size * 1.5 }] }
            />
          ),
        }} 
      />
      <Drawer.Screen 
        name="CHOOSE APP ICON" 
        component={ChooseLogo} 
        options={{ 
          drawerIcon: ({ focused, size }) => (
            <Image
              source={require('../Assets/Choose.png')}
              style={[styles.icon, { width: size * 1.5, height: size * 1.5 }] }
            />
          ),
        }} 
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#000',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120, 
    resizeMode: 'contain',
  },
  icon: {
    resizeMode: 'contain',
  },
  footerSpacer: {
    flex: 1, 
  },
  footerContainer: {
    marginTop: 170,
    paddingHorizontal: 20,
    alignItems: 'baseline',

  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '300',
  },
  footerText1: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '300',
    marginBottom: 15,
  },
});

export default DrawerNavigator;
