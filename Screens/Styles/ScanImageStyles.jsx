import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000', 
    },
    heading: {
      color: '#FFFFFF', 
      fontSize: 20,  
      fontWeight: 'bold',
      marginBottom: 20, 
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
    centerIconContainer: {
      position: 'absolute', 
      left: 0, 
      right: 0, 
      top: 0, 
      bottom: 0, 
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    icon: {
      width: 100, 
      height: 100, 
      tintColor: '#FFFFFF', 
      marginBottom: 20,
    },
    image: {
      width: 200,
      height: 200,
      marginTop: 20,
      borderColor: '#FFFFFF', 
      borderWidth: 2,
    },
    qrCodeText: {
      marginTop: 10,
      color: '#FFFFFF', 
      fontSize: 16,
      fontWeight: 'bold',
      textDecorationLine: 'underline', 
    },
    icon1: {
      width: 30,
      height: 30,
    },
    icon2: {
      width: 80,
      height: 80,
    },
    centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:100,
    },
    itemContainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
  });
  
export default styles;
