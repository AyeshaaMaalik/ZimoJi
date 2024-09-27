import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert , Share} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';

const History = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [historyData, setHistoryData] = useState([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false); 

  useEffect(() => {
    const loadHistoryData = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('historyData');
        if (storedHistory) {
          setHistoryData(JSON.parse(storedHistory));
        } else {
          setHistoryData(route.params?.history || []);
        }
      } catch (error) {
        console.error('Failed to load history data:', error);
        setHistoryData(route.params?.history || []);
      }
    };

    loadHistoryData();
  }, [route.params?.history]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      console.error(`Invalid date: ${dateString}`);
      return { formattedDate: null, isToday: false };
    }

    const isToday = date.toDateString() === new Date().toDateString();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const datePart = date.toLocaleDateString('en-US', options);
    const timePart = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    return {
      formattedDate: `${datePart} | ${timePart}`,
      isToday,
      displayDate: isToday ? 'Today' : date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase(),
    };
  };

  const deleteHistoryItem = async (itemToDelete) => {
    const updatedHistory = historyData.filter(item => item.id !== itemToDelete.id);
    setHistoryData(updatedHistory);
    setSelectedHistoryItem(null);
  };

  const groupedHistory = historyData.reduce((acc, item) => {
    const { formattedDate, isToday, displayDate } = formatDate(item.date);
    if (formattedDate) {
      const sectionKey = isToday ? 'Today' : displayDate;
      if (!acc[sectionKey]) {
        acc[sectionKey] = [];
      }
      acc[sectionKey].push(item);
    }
    return acc;
  }, {});

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert('Copied to Clipboard', 'The URL or text has been copied to the clipboard.');
  };



  const shareContent = async (content) => {
    try {
      const result = await Share.share({
        message: content,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share the content.');
    }
  };
  
  const handleFavouritePress = () => {
    setIsFavourite(!isFavourite); 
    navigation.navigate('FAVOURITES'); 
  };

  if (selectedHistoryItem) {
    const { formattedDate } = formatDate(selectedHistoryItem.date);
    const isQRCode = !selectedHistoryItem.url;

    return (
      <View style={styles.container1}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={require('../Assets/Menu.png')} style={styles.icon1} resizeMode="contain" />
          </TouchableOpacity>
          <Image source={require('../Assets/SplashWhite.png')} style={styles.icon2} resizeMode="contain" />
          <View style={styles.placeholder} />
        </View>

        <View style={styles.singleHistoryContainer}>
          <TouchableOpacity onPress={() => setSelectedHistoryItem(null)}>
            <View style={styles.HistoryContainer}>
              <Image source={require('../Assets/History.png')} style={styles.optionsIcon2} resizeMode="contain" />
              <Text style={styles.HistoryTitle}>HISTORY</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.urlContainer1}>
            <Image
              source={isQRCode
                ? require('../Assets/Text.png')
                : require('../Assets/download.png')
              }
              style={styles.optionsIcon1}
              resizeMode="contain"
            />
            <Text style={styles.urlTitle1}>{isQRCode ? 'TEXT' : 'URL'}</Text>
          </View>

          <Text style={styles.urlContainer1}>{isQRCode ? selectedHistoryItem.scannedText : selectedHistoryItem.url}</Text>
          <Text style={styles.title1}>{selectedHistoryItem.title}</Text>
          <Text style={styles.date1}>{formattedDate}</Text>

          <View style={styles.bottomIcons}>
          <TouchableOpacity onPress={handleFavouritePress}>
              <Image
                source={require('../Assets/Favourites.png')}
                style={[
                  styles.bottomIcon,
                  { tintColor: isFavourite ? '#8D0000' : 'white' }, 
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => shareContent(isQRCode ? selectedHistoryItem.scannedText : selectedHistoryItem.url)}>
              <Image source={require('../Assets/Share.png')} style={styles.bottomIcon} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => copyToClipboard(isQRCode ? selectedHistoryItem.scannedText : selectedHistoryItem.url)}>
              <Image source={require('../Assets/Copy.png')} style={styles.bottomIcon} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteHistoryItem(selectedHistoryItem)}>
              <Image source={require('../Assets/Delete.png')} style={styles.bottomIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }



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
            <View style={styles.HistoryContainer}>
              <Image source={require('../Assets/History.png')} style={styles.optionsIcon2} resizeMode="contain" />
              <Text style={styles.HistoryTitle}>HISTORY</Text>
            </View>
            <Text style={styles.sectionTitle}>{sectionKey}</Text>
            {groupedHistory[sectionKey].map((item) => {
              const { formattedDate } = formatDate(item.date);
              const isQRCode = !item.url;
              return (
                <View key={item.id} style={styles.historyItem}>
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
                  <TouchableOpacity style={styles.iconWrapper} onPress={() => setSelectedHistoryItem(item)}>
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
  container1: {
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
    color: 'gray',
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
    backgroundColor: 'black',
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 8,
    marginBottom: 10,
    color: 'white',
  },
  urlContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: 10,
    color: 'white',
    fontSize: 15,
  },
  HistoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 8,
  },
  HistoryTitle: {
    fontWeight: 'bold',
    color: 'white',
    marginRight: 5,
    fontSize: 20,
    marginBottom: 20,
  },
  HistoryTitle1: {
    fontWeight: 'bold',
    color: 'white',
    marginRight: 5,
    fontSize: 25,
    marginBottom: 20,
  },
  urlTitle: {
    fontWeight: '400',
    color: 'white',
    marginRight: 5,
    fontSize: 13,
  },
  urlTitle1: {
    fontWeight: '400',
    color: 'white',
    fontSize: 15,
  },
  url: {
    color: 'white',
    marginBottom: 3,
  },
  url1: {
    color: 'white',
    marginBottom: 5,
    fontSize: 15,
  },
  title: {
    color: 'white',
    marginBottom: 10,
  },
  title1: {
    color: 'white',
    marginBottom: 10,
    fontSize: 15,
  },
  date: {
    color: 'gray',
    fontSize: 12,
  },
  date1: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 25,
  },
  iconWrapper: {
    padding: 5,
  },
  optionsIcon: {
    width: 30,
    height: 30,
  },
  optionsIcon1: {
    width: 13,
    height: 13,
    marginRight: 10,
  },
  optionsIcon11: {
    width: 10,
    height: 10,
    marginRight: 10,
  },
  optionsIcon2: {
    width: 30,
    height: 30,
    marginRight: 20,
    marginBottom: 20,
  },
  singleHistoryContainer: {
    padding: 20,
  },
  backText: {
    color: 'white',
    marginBottom: 20,
    fontSize: 16,
  },
  bottomIcons: {
    position: 'absolute',
    bottom: -15,
    left: 10,
    flexDirection: 'row',
  },
  bottomIcon: {
    width: 20,
    height: 30,
    marginHorizontal: 15,
  },
  qrCodeContainer: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  qrCodeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default History;
