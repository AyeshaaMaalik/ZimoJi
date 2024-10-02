import React, { useEffect } from 'react';
import { View, Image, PermissionsAndroid, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../Styles/SplashStyles';

const SplashScreen = ({ navigation }) => {
  const isDay = useSelector(state => state.theme.isDay);

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

    requestCameraPermission();

  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: isDay ? 'white' : 'black' }]}>
      <Image
        source={isDay ? require('../Assets/SplashBlack.png') : require('../Assets/SplashWhite.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
