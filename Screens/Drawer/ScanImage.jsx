import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNQRGenerator from 'rn-qr-generator';
import { readFile } from 'react-native-fs'; 
import { Linking } from 'react-native'; 
import styles from '../Styles/ScanImageStyles';

const ScanImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [qrCodeData, setQRCodeData] = useState('');
  const navigation = useNavigation();

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      if (result && result[0]) {
        const fileUri = result[0].uri;
        setSelectedImage(fileUri);
        
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
      //console.log('Base64 Image String:', base64Image); 

      const response = await RNQRGenerator.detect({ base64: base64Image });

      console.log('QR Detection Response:', response);
      if (response.values && response.values.length > 0) {
        const detectedValue = response.values[0];
        setQRCodeData(detectedValue);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../Assets/Menu.png')}
            style={styles.icon1}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.centerIconContainer}>
          <Image
            source={require('../Assets/SplashWhite.png')}
            style={styles.icon2}
            resizeMode="contain"
          />
        </View>
      </View>

      <Text style={styles.heading}>SELECT PICTURE FOR SCANNING</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={require('../Assets/ScanImage.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <Text style={styles.qrCodeText}>
            QR Code Data: {qrCodeData || 'N/A'}
          </Text>
        </>
      )}
    </View>
  );
};

export default ScanImage;
