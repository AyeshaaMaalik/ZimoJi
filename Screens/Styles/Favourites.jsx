import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      paddingTop: 70,
    },
    lowercontainer: {
      padding: 20,
    },
    text: {
      fontSize: 20,
      color: 'black',
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
    optionsIcon2: {
      width: 30,
      height: 30,
      marginRight: 20,
      marginBottom: 20,
    },
  });
export default styles;
