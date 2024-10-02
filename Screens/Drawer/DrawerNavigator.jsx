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
      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>
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
        <View style={styles.termsContainer}>
          <Text style={styles.footerText}>
            TERMS | PRIVACY
          </Text>
          <Image 
            source={require('../Assets/ZIMOWhite.png')} 
            style={styles.icon} 
          />
        </View>
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
        headerShown: false,
        drawerStyle: { backgroundColor: '#000' },
        drawerLabelStyle: {
          color: '#fff',
        },
        drawerActiveBackgroundColor: '#000',
        drawerActiveTintColor: '#FFD700', 
        drawerInactiveTintColor: '#fff',
      }}
    >
      <Drawer.Screen 
        name="SCAN" 
        component={Scan} 
        options={{ 
          drawerIcon: ({ focused, size }) => renderDrawerIcon(focused, size, require('../Assets/Scan.png')),
          cardStyle: { backgroundColor: '#000' },
        }} 
      />
      <Drawer.Screen 
        name="SCAN IMAGE" 
        component={ScanImage} 
        options={{ 
          drawerIcon: ({ focused, size }) => renderDrawerIcon(focused, size, require('../Assets/ScanImage.png')),
          cardStyle: { backgroundColor: '#000' },
        }} 
      />
      <Drawer.Screen 
        name="HISTORY" 
        component={History} 
        options={{ 
          drawerIcon: ({ focused, size }) => renderDrawerIcon(focused, size, require('../Assets/History.png')),
          cardStyle: { backgroundColor: '#000' },
        }} 
      />
      <Drawer.Screen 
        name="FAVOURITES" 
        component={Favorites} 
        options={{ 
          drawerIcon: ({ focused, size }) => renderDrawerIcon(focused, size, require('../Assets/Favourites.png')),
          cardStyle: { backgroundColor: '#000' },
        }} 
      />
      <Drawer.Screen 
        name="CONTACT" 
        component={Contacts} 
        options={{ 
          drawerIcon: ({ focused, size }) => renderDrawerIcon(focused, size, require('../Assets/Contact.png')),
          cardStyle: { backgroundColor: '#000' },
        }} 
      />
      <Drawer.Screen 
        name="CHOOSE APP ICON" 
        component={ChooseLogo} 
        options={{ 
          drawerIcon: ({ focused, size }) => renderDrawerIcon(focused, size, require('../Assets/Choose.png')),
          cardStyle: { backgroundColor: '#000' },
        }} 
      />
    </Drawer.Navigator>
  );
};

const renderDrawerIcon = (focused, size, iconSource) => (
  <View style={styles.drawerItem}>
    {focused && (
      <Image
        source={require('../Assets/MenuSection.png')}
        style={[styles.menuIcon, { width: size, height: size * 1}]} 
      />
    )}
    <Image
      source={iconSource}
      style={[styles.icon1, { width: size , height: size * 1.5 }]} 
    />
  </View>
);

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#000',
  },
  logoContainer: {
    top: -10,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:25,
    position: 'relative', 
    },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  icon: {
    resizeMode: 'contain',
    width: 200,
    height: 25,
  },
  icon1: {
    resizeMode: 'contain',
    width: 15,
    height: 15,
    marginLeft:20, 
  },
  menuIcon: {
    resizeMode: 'contain',
    position: 'absolute', 
    left: 0,
  },
  drawerItemsContainer: {},
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'flex-start',
    height: 40, 
    width: 30, 
    marginLeft: -10,
  },
  footerSpacer: {
    flex: 1,
  },
  footerContainer: {
    marginTop: 100,
    paddingHorizontal: 20,
    alignItems: 'baseline',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  footerText: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 10,
    fontWeight: '300',
    marginRight: 5,
    letterSpacing: 1.7, 

  },
  footerText1: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '300',
    marginBottom: 15,
    letterSpacing: 1.7, 
  },
});

export default DrawerNavigator;
