import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../Styles/HistoryStyles';

const HistoryItem = ({ item, onSelect, onDelete, onCopy, onShare }) => {
  const { formattedDate, isQRCode } = item;

  return (
   
    <View style={styles.historyItem}>

      <Image source={require('../Assets/MenuSection.png')} style={styles.historyIcon} resizeMode="contain" />
      <View style={styles.historyContent}>
        {isQRCode ? (
          <View style={styles.qrCodeContainer}>
            <View style={styles.urlContainer}>
              <Image source={require('../Assets/Text.png')} style={styles.optionsIcon11} resizeMode="contain" />
              <Text style={styles.urlTitle}>TEXT</Text>
            </View>
            <Text style={styles.qrCodeText}>{item.scannedText}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        ) : (
          <>
            <View style={styles.urlContainer}>
              <Image source={require('../Assets/download.png')} style={styles.optionsIcon11} resizeMode="contain" />
              <Text style={styles.urlTitle}>URL</Text>
            </View>
            <Text style={styles.url}>{item.url}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </>
        )}
      </View>
      <TouchableOpacity style={styles.iconWrapper} onPress={() => onSelect(item)}>
        <Image source={require('../Assets/Option.png')} style={styles.optionsIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default HistoryItem;
