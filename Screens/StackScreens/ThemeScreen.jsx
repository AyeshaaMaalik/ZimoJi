import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeScreen = ({ navigation }) => {
    useEffect(() => {
        const checkLaunchCount = async () => {
            try {
                const count = await AsyncStorage.getItem('launchCount');
                const launchCount = count ? parseInt(count, 10) : 0;

                const newCount = launchCount + 1; 
                await AsyncStorage.setItem('launchCount', newCount.toString());

                if (newCount % 2 === 1) {
                    navigation.navigate('Splash');
                } else {
                    navigation.navigate('Splash2'); 
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkLaunchCount();
    }, []);

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});

export default ThemeScreen;
