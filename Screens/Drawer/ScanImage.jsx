import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNQRGenerator from 'rn-qr-generator';

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
        scanQRCode(fileUri);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Canceled');
      } else {
        console.error('Error picking the document: ', err);
      }
    }
  };

  const scanQRCode = (imageUri) => {
    RNQRGenerator.detect({ uri: imageUri })
      .then((response) => {
        const { values } = response;
        if (values.length > 0) {
          setQRCodeData(values[0]);
          Alert.alert('QR Code Found', values[0]);
        } else {
          Alert.alert('No QR Code Found', 'No QR code was detected in the image.');
        }
      })
      .catch((error) => {
        console.log('QR code detection failed:', error);
        Alert.alert('Error', 'Could not scan the image for a QR code.');
      });
  };

  const handlePressQRCodeData = () => {
    const urlPattern = /^(https?:\/\/[^\s]+)/; 
    if (urlPattern.test(qrCodeData)) {
      Linking.openURL(qrCodeData).catch(err =>
        Alert.alert('Error', 'Failed to open URL')
      );
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
          <TouchableOpacity onPress={handlePressQRCodeData}>
            <Text style={styles.qrCodeText}>
              QR Code Data: {qrCodeData || 'N/A'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', 
  },
  heading: {
    color: '#FFFFFF', 
    fontSize: 20,  
    fontWeight: 'bold',
    marginBottom: 20, 
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
  centerIconContainer: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  icon: {
    width: 100, 
    height: 100, 
    tintColor: '#FFFFFF', 
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderColor: '#FFFFFF', 
    borderWidth: 2,
  },
  qrCodeText: {
    marginTop: 10,
    color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline', 
  },
  icon1: {
    width: 30,
    height: 30,
  },
  icon2: {
    width: 80,
    height: 80,
  },
});

export default ScanImage;
