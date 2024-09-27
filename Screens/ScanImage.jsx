import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, Linking , PermissionsAndroid} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { PERMISSIONS, request } from 'react-native-permissions';
import ml from '@react-native-firebase/ml';

const ScanImage = () => {  
  const [selectedImage, setSelectedImage] = useState(null);
  const [qrCodeData, setQRCodeData] = useState('');
  const navigation = useNavigation();

  const requestStoragePermission = async () => {
    try {
      const granted = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
        pickImage();
      } else {
        Alert.alert('Permission Denied', 'You need to give storage permission to pick an image.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

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

  const scanQRCode = async (imageUri) => {
    try {
      const processed = await ml().cloudDocumentTextRecognizerProcessImage(imageUri);
      if (processed && processed.blocks.length > 0) {
        const qrCodeText = processed.blocks[0].text;
        setQRCodeData(qrCodeText);
        Alert.alert('QR Code Found', qrCodeText);
      } else {
        Alert.alert('No QR Code Found', 'No QR code was detected in the image.');
      }
    } catch (error) {
      console.error('QR code detection failed:', error);
      Alert.alert('Error', 'Could not scan the image for a QR code.');
    }
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
            source={require('./Assets/Menu.png')}
            style={styles.icon1}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.centerIconContainer}>
          <Image
            source={require('./Assets/SplashWhite.png')}
            style={styles.icon2}
            resizeMode="contain"
          />
        </View>
      </View>
      
      <Text style={styles.heading}>SELECT PICTURE FOR SCANNING</Text>
      
      <TouchableOpacity onPress={requestStoragePermission}>
        <Image 
          source={require('./Assets/ScanImage.png')} 
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
