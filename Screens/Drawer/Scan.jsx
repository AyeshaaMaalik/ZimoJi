import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Linking, Image, TouchableOpacity, Alert } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

const Main = () => {
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const device = useCameraDevice(isFrontCamera ? 'front' : 'back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const navigation = useNavigation();
  const [flashOn, setFlashOn] = useState(false);
  const [scannedCode, setScannedCode] = useState(''); 

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
      if (codes.length > 0) {
        const codeData = codes[0].data;
        setScannedCode(codeData);
        Alert.alert("QR Code Scanned", `Scanned Code: ${codeData}`, [
          {
            text: "Open Link",
            onPress: () => {
              if (codeData.startsWith('http://') || codeData.startsWith('https://')) {
                Linking.openURL(codeData);
              }
            },
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]);
      }
    }
  });

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    };
    requestCameraPermission();
  }, [hasPermission, requestPermission]);

  const toggleTorch = () => {
    setFlashOn(prev => !prev);
  };

  const toggleCamera = () => {
    if (flashOn) {
      toggleTorch();
    }
    setIsFrontCamera(prev => !prev);
  };

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
        flash={flashOn ? 'on' : 'off'}
        codeScanner={codeScanner}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../Assets/Menu.png')}
            style={styles.icon1}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Image
          source={require('../Assets/SplashWhite.png')}
          style={styles.icon2}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={toggleTorch}>
          <Image
            source={flashOn
              ? require('../Assets/TorchFlashON.png')
              : require('../Assets/TorchFlashOFF.png')}
            style={styles.icon3}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.flipContainer}>
        <TouchableOpacity onPress={toggleCamera}>
          <Image
            source={require('../Assets/Flip.png')}
            style={styles.flipIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Display the scanned code */}
      {scannedCode ? (
        <View style={styles.scannedCodeContainer}>
          <Text style={styles.scannedCodeText}>Scanned Code: {scannedCode}</Text>
        </View>
      ) : null}
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
  flipContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  flipIcon: {
    width: 30,
    height: 30,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon1: {
    width: 30,
    height: 30,
  },
  icon2: {
    width: 80,
    height: 80,
  },
  icon3: {
    width: 30,
    height: 30,
  },
  scannedCodeContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
  },
  scannedCodeText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});

export default Main;
