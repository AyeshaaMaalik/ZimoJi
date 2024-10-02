import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AppNavigator from './Screens/AppNavigator';
import store from './Screens/Themes/Store';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setDayTheme } from './Screens/Themes/themeSlice';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeManager />
      <AppNavigator />
    </Provider>
  );
};

const ThemeManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAppOpenCount = async () => {
      try {
        const openCountString = await AsyncStorage.getItem('appOpenCount');
        let openCount = openCountString ? parseInt(openCountString) : 0;

        if (openCount % 2 === 0) {
          dispatch(setDayTheme(false));
        } else {
          dispatch(setDayTheme(true));
        }

        openCount += 1;
        await AsyncStorage.setItem('appOpenCount', openCount.toString());
      } catch (error) {
        console.log('Error checking app open count', error);
      }
    };

    checkAppOpenCount();
  }, [dispatch]);

  return null; 
};

export default App;

const styles = StyleSheet.create({});
