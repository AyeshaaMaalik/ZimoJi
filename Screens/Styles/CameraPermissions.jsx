import { StyleSheet } from 'react-native';

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

export default styles;
