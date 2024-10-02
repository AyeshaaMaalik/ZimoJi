// HistoryItem.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryItem = ({ title, date, url }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
      {url && <Text style={styles.url}>{url}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  url: {
    fontSize: 14,
    color: 'blue',
  },
});

export default HistoryItem;
