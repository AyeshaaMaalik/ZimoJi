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
          drawerIcon: ({ focused, size }) => (
            <View style={styles.drawerItem}>
              <Image
                source={require('../Assets/Scan.png')}
                style={[styles.icon1, { width: size * 1.5, height: size * 1.5 }]} 
              />
              {focused && (
                
                <Image
                  source={require('../Assets/MenuSection.png')} 
                  style={[styles.menuIcon, { width: size , height: size * 1.7}]} 
                />
              )}
            </View>
          ),
          cardStyle: { backgroundColor: '#000' },
        }} 
      />
      <Drawer.Screen 
        name="SCAN IMAGE" 
        component={ScanImage} 
        options={{ 
          drawerIcon: ({ focused, size }) => (
            <View style={styles.drawerItem}>
              <Image
                source={require('../Assets/ScanImage.png')} 
                style={[styles.icon1, { width: size * 1.5, height: size * 1.5 }]} 
              />
              {focused && (
                <Image
                  source={require('../Assets/MenuSection.png')}
                  style={[styles.menuIcon, { width: size , height: size * 1.7}]} 
                />
              )}
            </View>
          ),
          cardStyle: { backgroundColor: '#000' },
        }} 
      />
      <Drawer.Screen 
        name="HISTORY" 
        component={History} 
        options={{ 
          drawerIcon: ({ focused, size }) => (
            <View style={styles.drawerItem}>
              <Image
                source={require('../Assets/History.png')} 
                style={[styles.icon1, { width: size * 1.5, height: size * 1.5 }]} 
              />
              {focused && (
                <Image
                  source={require('../Assets/MenuSection.png')}
                  style={[styles.menuIcon, { width: size , height: size * 1.7}]} 
                />
              )}
            </View>
          ),
          cardStyle: { backgroundColor: '#000' },
        }} 
      />
      <Drawer.Screen 
        name="FAVOURITES" 
        component={Favorites} 
        options={{ 
          drawerIcon: ({ focused, size }) => (
            <View style={styles.drawerItem}>
              <Image
                source={require('../Assets/Favourites.png')}
                style={[styles.icon1, { width: size * 1.5, height: size * 1.5 }]} 
              />
              {focused && (
                <Image
                  source={require('../Assets/MenuSection.png')}
                  style={[styles.menuIcon,  { width: size , height: size * 1.7}]} 
                />
              )}
            </View>
          ),
          cardStyle: { backgroundColor: '#000' },
        }} 
      />
      <Drawer.Screen 
        name="CONTACT" 
        component={Contacts} 
        options={{ 
          drawerIcon: ({ focused, size }) => (
            <View style={styles.drawerItem}>
              <Image
                source={require('../Assets/Contact.png')} 
                style={[styles.icon1, { width: size * 1.5, height: size * 1.5 }]} 
              />
              {focused && (
                <Image
                  source={require('../Assets/MenuSection.png')}
                  style={[styles.menuIcon,  { width: size , height: size * 1.7}]} 
                />
              )}
            </View>
          ),
          cardStyle: { backgroundColor: '#000' },
        }} 
      />
      <Drawer.Screen 
        name="CHOOSE APP ICON" 
        component={ChooseLogo} 
        options={{ 
          drawerIcon: ({ focused, size }) => (
            <View style={styles.drawerItem}>
              <Image
                source={require('../Assets/Choose.png')}
                style={[styles.icon1, { width: size * 1.5, height: size * 1.5 }]} 
              />
              {focused && (
                <Image
                  source={require('../Assets/MenuSection.png')}
                  style={[styles.menuIcon, { width: size , height: size * 1.7}]} 
                />
              )}
            </View>
          ),
          cardStyle: { backgroundColor: '#000' },
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
    alignItems: 'flex-start',
    paddingLeft: 53, 
  },
  logo: {
    width: 120,
    height: 120, 
    resizeMode: 'contain',
  },
  icon: {
    resizeMode: 'contain',
    width: 200, 
    height: 30, 
  },
  icon1: {
    resizeMode: 'contain',
    width: 30, 
    height: 30,
    left: 23,
    top: '50%', 
    transform: [{ translateY: -15 }],
  },
  menuIcon: {
    width: 30,
    resizeMode: 'contain', 
    marginRight: 10, 
  },
  drawerItemsContainer: {},
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    justifyContent:'flex-start',
    position: 'relative',
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
