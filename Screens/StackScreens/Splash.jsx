import React, { useEffect } from 'react';
import { View, Image, StyleSheet, PermissionsAndroid, Platform } from 'react-native';

const Splash = ({ navigation }) => {
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
              buttonPositive: "OK"
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
    <View style={styles.container}>
      <Image
        source={require('../Assets/SplashBlack.png')}
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
    backgroundColor: 'white',
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default Splash;
