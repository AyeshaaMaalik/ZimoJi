import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Linking, Image } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

const Main = () => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    };
    requestCameraPermission();
  }, [hasPermission, requestPermission]);

  const PermissionsPage = () => (
    <View style={styles.container}>
      <Text style={styles.text}>Camera permission is required to use this feature.</Text>
      <Button title="Open Settings" onPress={() => Linking.openSettings()} />
    </View>
  );

  const NoCameraDeviceError = () => (
    <View style={styles.container}>
      <Text style={styles.text}>No camera device found.</Text>
    </View>
  );

  if (!hasPermission) return <PermissionsPage />;
  if (device == null) return <NoCameraDeviceError />;

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
      />
      <Text style={styles.text}>Camera is Active</Text>
      
      <View style={styles.header}>
        <Image source={require('../Assets/Menu.png')} style={styles.icon1} />
        <Image source={require('../Assets/SplashWhite.png')} style={styles.icon2} />
        <Image source={require('../Assets/TorchFlashOFF.png')} style={styles.icon3} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  text: {
    position: 'absolute',
    bottom: 20,
    color: '#fff',
    fontSize: 18,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon1: {
    width: 40,
    height: 40,
  },
  icon2: {
    width: 30, 
    height: 30,
  },
  icon3: {
    width: 20, 
    height: 20,
  },
});

export default Main;
