import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChooseLogo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choose Application Logo Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',

  },
});

export default ChooseLogo;
