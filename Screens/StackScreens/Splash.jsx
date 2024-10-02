import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const [isBlackBackground, setIsBlackBackground] = useState(true); 

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera Permission",
              message: "This app needs access to your camera to scan QR codes.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera permission granted");
            navigation.replace('Main');
          } else {
            console.log("Camera permission denied");
            navigation.replace('Permission');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    const checkLaunchCount = async () => {
      try {
        const count = await AsyncStorage.getItem('launchCount');
        const launchCount = count ? parseInt(count, 10) : 0;

        const newCount = launchCount + 1; 
        await AsyncStorage.setItem('launchCount', newCount.toString());

        setIsBlackBackground(newCount % 2 === 1); 
      } catch (error) {
        console.error(error);
      }
    };

    checkLaunchCount();
    requestCameraPermission(); 

  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: isBlackBackground ? 'black' : 'white' }]}>
      <Image
        source={isBlackBackground ? require('../Assets/SplashWhite.png') : require('../Assets/SplashBlack.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150, 
    height: 150, 
  },
});

export default SplashScreen;
