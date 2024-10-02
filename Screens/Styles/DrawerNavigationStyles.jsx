import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    drawer: {
      backgroundColor: '#000',
    },
    logoContainer: {
      top: -10,
      left: 0,
      right: 0,
      height: 70,
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft:25,
      position: 'relative', 
      },
    logo: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
    },
    icon: {
      resizeMode: 'contain',
      width: 200,
      height: 25,
    },
    icon1: {
      resizeMode: 'contain',
      width: 15,
      height: 15,
      marginLeft:20, 
    },
    menuIcon: {
      resizeMode: 'contain',
      position: 'absolute', 
      left: 0,
    },
    drawerItemsContainer: {},
    drawerItem: {
      flexDirection: 'row',
      alignItems: 'center', 
      justifyContent: 'flex-start',
      height: 40, 
      width: 30, 
      marginLeft: -10,
    },
    footerSpacer: {
      flex: 1,
    },
    footerContainer: {
      marginTop: 100,
      paddingHorizontal: 20,
      alignItems: 'baseline',
    },
    termsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    footerText: {
      color: '#fff',
      textAlign: 'left',
      fontSize: 10,
      fontWeight: '300',
      marginRight: 5,
      letterSpacing: 1.7, 
  
    },
    footerText1: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 10,
      fontWeight: '300',
      marginBottom: 15,
      letterSpacing: 1.7, 
    },
  });
export default styles;
