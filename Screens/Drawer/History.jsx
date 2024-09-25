import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
const History = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const historyData = route.params?.history || []; 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    if (isNaN(date)) {
      console.error(`Invalid date: ${dateString}`);
      return { formattedDate: null };
    }

    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return {
      formattedDate: date.toLocaleString('en-GB', options).replace(',', ''),
    };
  };

  const groupedHistory = historyData.reduce((acc, item) => {
    const { formattedDate } = formatDate(item.date);
    
    if (formattedDate) {
      const sectionKey = formattedDate.split(' ')[0]; 
      if (!acc[sectionKey]) {
        acc[sectionKey] = [];
      }
      acc[sectionKey].push(item);
    }
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../Assets/Menu.png')} style={styles.icon1} resizeMode="contain" />
        </TouchableOpacity>
        <Image source={require('../Assets/SplashWhite.png')} style={styles.icon2} resizeMode="contain" />
        <View style={styles.placeholder} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Object.keys(groupedHistory).map((sectionKey) => (
          <View key={sectionKey} style={styles.historyContainer}>
            <Text style={styles.sectionTitle}>
              {sectionKey === `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}` ? 'Today' : sectionKey}
            </Text>
            {groupedHistory[sectionKey].map((item) => {
              const { formattedDate } = formatDate(item.date);
              return (
                <View key={item.id} style={styles.historyItem}>
                  <Image source={require('../Assets/MenuSection.png')} style={styles.historyIcon} resizeMode="contain" />
                  <View style={styles.historyContent}>
                    <Text style={styles.urlTitle}>URL</Text>
                    <Text style={styles.url}>{item.url}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{formattedDate}</Text> 
                  </View>
                  <TouchableOpacity style={styles.iconWrapper}>
                    <Image source={require('../Assets/Option.png')} style={styles.optionsIcon} resizeMode="contain" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
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
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  historyIcon: {
    width: 20,
    height: 50,
  },
  historyContent: {
    flex: 1,
    backgroundColor:'black',
  },
  urlTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  url: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  title: {
    color: 'white',
  },
  date: {
    color: 'white',
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

export default History;
