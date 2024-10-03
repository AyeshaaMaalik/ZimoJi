import React from 'react';
import { View, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Styles/ScanImageStyles';

const HeaderWithLogo = () => {
  const navigation = useNavigation();

  return (
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
  );
};


export default HeaderWithLogo;
