import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Wrapperstack from './Wrapperstack';

const History1 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const historyData = route.params?.history || []; 

  return (
    <Wrapperstack>
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {historyData.map((item, index) => (
          <View key={item.id} style={styles.historyContainer}>
            {index === 0 && <Text style={styles.sectionTitle}>Today</Text>}
            <View style={styles.historyItem}>
              <Image source={require('../Assets/MenuSection.png')} style={styles.historyIcon} resizeMode="contain" />
              <View style={styles.historyContent}>
                <Text style={styles.urlTitle}>URL</Text>
                <Text style={styles.url}>{item.url}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>{`${item.date} | ${item.time}`}</Text>
              </View>
              <TouchableOpacity style={styles.iconWrapper}>
                <Image source={require('../Assets/Option.png')} style={styles.optionsIcon} resizeMode="contain" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
    </Wrapperstack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 70,
  },
  scrollContainer: {
    padding: 20,
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
  icon1: {
    width: 30,
    height: 30,
  },
  icon2: {
    width: 80,
    height: 80,
  },
  placeholder: {
    width: 30, 
  },
  historyContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#E0A75E',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F9D689',
    borderRadius: 8,
  },
  historyIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  historyContent: {
    flex: 1,
  },
  urlTitle: {
    fontWeight: 'bold',
    color: '#973131',
  },
  url: {
    color: '#F5E7B2',
    textDecorationLine: 'underline',
  },
  title: {
    color: '#973131',
  },
  date: {
    color: '#973131',
    fontSize: 12,
  },
  iconWrapper: {
    padding: 5,
  },
  optionsIcon: {
    width: 30,
    height: 30,
  },
});

export default History1;
