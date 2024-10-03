import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, ToastAndroid, FlatList } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNQRGenerator from 'rn-qr-generator';
import { readFile } from 'react-native-fs';
import { Linking } from 'react-native';
import styles from '../Styles/ScanImageStyles';
import ScanItem from './ScanItem';
import HeaderWithLogo from './HeaderWIthLogo'; 

const ScanImage = () => {
  const [scannedItems, setScannedItems] = useState([]);

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (result && result[0]) {
        const fileUri = result[0].uri;
        scanImage(fileUri); 
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled');
      } else {
        console.error('Error picking the document: ', err);
      }
    }
  };

  const scanImage = async (uri) => {
    try {
      const base64Image = await readFile(uri, 'base64');
      const response = await RNQRGenerator.detect({ base64: base64Image });

      if (response.values && response.values.length > 0) {
        const detectedValue = response.values[0];
        setScannedItems(prevItems => [...prevItems, { imageUri: uri, qrCodeData: detectedValue }]);

        Alert.alert('QR Code Found', detectedValue);
        if (detectedValue.startsWith('http://') || detectedValue.startsWith('https://')) {
          Linking.openURL(detectedValue).catch(err => {
            console.error('Failed to open URL:', err);
          });
        } else {
          ToastAndroid.show(`Detected: ${detectedValue}`, ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show("No QR code found.", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('QR code detection failed:', error);
      ToastAndroid.show("Failed to detect QR code.", ToastAndroid.SHORT);
    }
  };

  const renderItem = ({ item }) => (
    <ScanItem imageUri={item.imageUri} qrCodeData={item.qrCodeData} />
  );

  return (
    <View style={styles.container}>
      <HeaderWithLogo />

      <View style={styles.centerContent}>
        <Text style={styles.heading}>SELECT PICTURE FOR SCANNING</Text>

        <TouchableOpacity onPress={pickImage}>
          <Image
            source={require('../Assets/ScanImage.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={scannedItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ScanImage;
