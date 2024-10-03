import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../Styles/ScanImageStyles';


const ScanItem = ({ imageUri, qrCodeData }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.qrCodeText}>
        QR Code Data: {qrCodeData || 'N/A'}
      </Text>
    </View>
  );
};


export default ScanItem;
