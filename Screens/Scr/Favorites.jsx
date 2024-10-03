import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text,  TouchableOpacity, Image } from 'react-native';
import styles from '../Styles/Favourites';

const Favorites = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../Assets/Menu.png')} style={styles.icon1} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={require('../Assets/SplashWhite.png')} style={styles.icon2} resizeMode="contain" />
        <View style={styles.placeholder} />
      </View>
      <View style={styles.lowercontainer}>
      <View style={styles.HistoryContainer}>
        <Image source={require('../Assets/Favourites.png')} style={styles.optionsIcon2} resizeMode="contain" />
        <Text style={styles.HistoryTitle}>FAVOURITES</Text>
      </View>
      </View>
    </View>
  );
};

export default Favorites;
