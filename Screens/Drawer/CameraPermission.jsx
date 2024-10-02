import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, PermissionsAndroid, Platform, Alert } from 'react-native';

const CameraPermission = () => {
    const navigation = useNavigation();
    const isDay = useSelector(state => state.theme.isDay); // Use isDay from Redux store

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "Camera Permission",
                        message: "This app needs access to your camera to scan ZIMOJI.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Camera permission granted");
                    navigation.navigate('Main');
                } else {
                    console.log("Camera permission denied");
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            console.log("Camera permission request not implemented for this platform.");
            navigation.navigate('Main');
        }
    };

    const handleCancel = () => {
        Alert.alert(
            "Permission Required",
            "Camera access is required to use the app's scanning feature. Please allow camera access in the app settings.",
            [{ text: "OK", onPress: () => console.log("Alert dismissed") }]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: isDay ? 'white' : 'black' }]}>
            <Image
                source={isDay ? require('../Assets/SplashBlack.png') : require('../Assets/SplashWhite.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Image
                source={isDay ? require('../Assets/output-onlinepngtools.png') : require('../Assets/CameraPermissions.png')}
                style={styles.icon}
                resizeMode="contain"
            />
            <Text style={[styles.title, { color: isDay ? '#000' : '#fff' }]}>CAMERA ACCESS IS REQUIRED</Text>
            <Text style={[styles.message, { color: isDay ? '#000' : '#fff' }]}>
                THIS APP NEEDS <Text style={styles.bold}>PERMISSION</Text> TO USE THE
                {'\n\n'}
                CAMERA FOR ZIMOJI SCANNING.
                {'\n\n\n'}
                TO USE THE APP, PLEASE ENABLE THE APP'S <Text style={styles.bold}>CAMERA</Text>
                {'\n\n'}
                <Text style={styles.bold}>PERMISSIONS </Text> TO ALLOW ZIMOJI SCANNING
            </Text>
            <Image
                source={isDay ? require('../Assets/output-onlinepngtoolss.png') : require('../Assets/Scan.png')}
                style={styles.qrIcon}
                resizeMode="contain"
            />
            <Text style={[styles.message, { color: isDay ? '#000' : '#fff' }]}>
                GRANT CAMERA ACCESS TO ENABLE THE APP'S
                {'\n\n'}
                CAMERA FUNCTIONALITY AND SCAN ZIMOJI'S
            </Text>
            <View style={[styles.buttonContainer, { backgroundColor: isDay ? 'white' : 'black' }]}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: isDay ? 'white' : 'black' }]}
                    onPress={handleCancel}
                >
                    <Text style={[styles.buttonText, { color: isDay ? 'black' : '#fff' }]}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.confirmButton, { backgroundColor: isDay ? 'white' : 'black' }]}
                    onPress={requestCameraPermission}
                >
                    <Text style={[styles.buttonText, { color: isDay ? 'black' : '#fff' }]}>CONFIRM</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.footerText, { color: isDay ? '#000' : '#fff' }]}>
                You will be directed to the app permissions section
            </Text>
            
            <Image
                source={isDay ? require('../Assets/ZIMOBlack.png') : require('../Assets/ZIMOWhite.png')}
                style={styles.footerLogo}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    icon: {
        width: 60,
        height: 60,
        marginBottom: 25,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 18,
        marginBottom: 30,
        letterSpacing: 1.3,
    },
    message: {
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 1.3,
    },
    bold: {
        fontWeight: '400',
    },
    qrIcon: {
        width: 50,
        height: 50,
        marginBottom: 30,
        marginTop: 20,
        resizeMode: 'contain',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: 'black',
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    confirmButton: {
        backgroundColor: 'black',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        letterSpacing: 1.7,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 1.3,
    },
    footerLogo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});

export default CameraPermission;
