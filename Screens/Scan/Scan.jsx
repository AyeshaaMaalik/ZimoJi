import React, { useState } from 'react';
import { View, Alert, Image, TouchableOpacity, ToastAndroid, Linking, FlatList } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import { useNavigation } from '@react-navigation/native';
import CameraPermission from '../Scr/CameraPermission';
import styles from '../Styles/ScanStyles';
import HistoryItem from './HistoryItem';
const Scan = () => {
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const { hasPermission, requestPermission } = useCameraPermission();
  const navigation = useNavigation();
  const device = useCameraDevice(isFrontCamera ? 'front' : 'back');
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
              title: 'URL Scanned',
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
              title: 'Text Scanned',
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
    },
  });


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

  const NoCameraDeviceError = () => (
    <View style={styles.container}>
      <Text style={styles.text}>No camera device found.</Text>
    </View>
  );

  if (!hasPermission) {
    return <CameraPermission />;
  }

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
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <HistoryItem 
            title={item.title} 
            date={item.date} 
            url={item.url || item.scannedText} 
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.historyContainer}
      />
    </View>
  );
};

export default Scan;
