import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, PermissionsAndroid, Platform, Alert } from 'react-native';

const CameraPermission2 = () => {
    const navigation = useNavigation();

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
                    handleCancel(); 
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
        <View style={styles.container}>
            <Image
                source={require('../Assets/SplashBlack.png')}
                style={styles.logo}
            />
            <Image
                source={require('../Assets/output-onlinepngtools.png')}
                style={styles.icon}
            />
            <Text style={styles.title}>CAMERA ACCESS IS REQUIRED</Text>
            <Text style={styles.message}>
                THIS APP NEEDS <Text style={styles.bold}>PERMISSION</Text> TO USE THE
                {'\n\n'}
                CAMERA FOR ZIMOJI SCANNING.
                {'\n\n\n'}
                TO USE THE APP, PLEASE ENABLE THE APP'S <Text style={styles.bold}>CAMERA</Text>
                {'\n\n'}
                <Text style={styles.bold}>PERMISSIONS </Text> TO ALLOW ZIMOJI SCANNING
            </Text>
            <Image
                source={require('../Assets/output-onlinepngtoolss.png')}
                style={styles.qrIcon}
            />
            <Text style={styles.message}>
                GRANT CAMERA ACCESS TO ENABLE THE APP'S
                {'\n\n'}
                CAMERA FUNCTIONALITY AND SCAN ZIMOJI'S
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCancel} 
                    accessibilityLabel="Cancel camera permission request"
                    accessibilityHint="Dismisses the permission request"
                >
                    <Text style={styles.buttonText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.confirmButton]}
                    onPress={requestCameraPermission} 
                    accessibilityLabel="Confirm camera permission"
                    accessibilityHint="Requests camera access"
                >
                    <Text style={styles.buttonText}>CONFIRM</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.footerText}>
                You will be directed to the app permissions section
            </Text>
            <Image
                source={require('../Assets/ZIMOBlack.png')}
                style={styles.footerLogo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
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
        color: 'black', 
        marginBottom: 30,
        letterSpacing: 1.3,
    },
    message: {
        fontSize: 12,
        color: 'black', 
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
    },
    button: {
        backgroundColor: 'white', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    confirmButton: {
        backgroundColor: 'white', 
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        letterSpacing: 1.7,
    },
    footerText: {
        fontSize: 12,
        color: 'black', 
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

export default CameraPermission2;
