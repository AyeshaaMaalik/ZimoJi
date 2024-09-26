import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Linking, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

const Main = () => {
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const device = useCameraDevice(isFrontCamera ? 'front' : 'back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const navigation = useNavigation();
  const [flashOn, setFlashOn] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false); 
  const [history, setHistory] = useState([]); 

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (isNavigating) {
        return; 
      }
  
      if (codes.length > 0) {
        const scannedCode = codes[0];
        const scannedText = scannedCode?.value; 
  
        if (scannedText) {
          console.log(`Scanned text: ${scannedText}`);
          setIsNavigating(true); 
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString(); 
          
          if (scannedText.startsWith('http')) {
            const historyEntry = {
              id: history.length + 1,
              date: formattedDate,
              url: scannedText,
              title: 'URL Scanned'
            };
            
            Linking.openURL(scannedText)
              .then(() => {
                ToastAndroid.show("Navigating to URL...", ToastAndroid.SHORT);
              })
              .catch(err => {
                console.error("Failed to open URL:", err);
                ToastAndroid.show("Failed to open URL", ToastAndroid.SHORT);
              });
  
            setHistory(prevHistory => [...prevHistory, historyEntry]);
            setTimeout(() => {
              navigation.navigate('HISTORY', { history: [...history, historyEntry] });
              setIsNavigating(false);
            }, 1000);
          } else {
            const textHistoryEntry = {
              id: history.length + 1,
              date: formattedDate,
              scannedText: scannedText,
              title: 'Text Scanned'
            };
            
            Alert.alert("Scanned text:", scannedText);
            ToastAndroid.show("Scanned text added to history.", ToastAndroid.SHORT);
            
            setHistory(prevHistory => [...prevHistory, textHistoryEntry]);
            setTimeout(() => {
              navigation.navigate('HISTORY', { history: [...history, textHistoryEntry] });
              setIsNavigating(false);
            }, 1000);
          }
        }
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

  const toggleTorch = async () => {
    if (device?.torchAvailable) {
      setFlashOn(prev => !prev);
    } else {
      Alert.alert("Flashlight not available on this device.");
    }
  };

  const toggleCamera = () => {
    if (flashOn) {
      toggleTorch();
    }
    setIsFrontCamera(prev => !prev);
  };

  const PermissionsPage = () => (
    <View style={styles.container1}>
      <Text style={styles.text1}>Camera permission is required to use this feature.</Text>
      <TouchableOpacity onPress={() => Linking.openSettings()}> 
      <Image 
        source={require('../Assets/CameraPermissions.png')} 
        style={styles.image1} 
      />
      </TouchableOpacity>
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
          <Image source={require('../Assets/Menu.png')} style={styles.icon1} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={require('../Assets/SplashWhite.png')} style={styles.icon2} resizeMode="contain" />
        <TouchableOpacity onPress={toggleTorch}>
          <Image source={flashOn ? require('../Assets/TorchFlashON.png') : require('../Assets/TorchFlashOFF.png')} style={styles.icon3} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <View style={styles.flipContainer}>
        <TouchableOpacity onPress={toggleCamera}>
          <Image source={require('../Assets/Flip.png')} style={styles.flipIcon} resizeMode="contain" />
        </TouchableOpacity>
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
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'black',
  },
  text1: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color:'white',
  },
  image1: {
    width: 100, 
    height: 100,
    resizeMode: 'contain', 
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
});

export default Main;
