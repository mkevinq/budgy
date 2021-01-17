import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Header({ goBack }) {
    return (
        <View>
            <View style={styles.padding}></View>
            <View style={styles.header}>
                <Image
                    style={styles.image}
                    source={require('../assets/logo.png')}
                />
            </View>
            <View style={styles.formContainer}>
                <TouchableOpacity style={styles.button} onPress={goBack}>
                    <Text style={styles.label}>Back</Text>
                </TouchableOpacity></View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    formContainer: {
        alignItems: 'center',
        backgroundColor: "white",
        paddingBottom:20,
    },
    image: {
        flex: 1,
        width: '80%',
        resizeMode: 'contain'
    },
    padding: {
        backgroundColor: 'white',
        height: 25,
    },
    button: {
        color: 'white',
        alignItems: 'center',
        backgroundColor: '#80ff80',
        padding: 10,
        width: 85,
        borderRadius: 100,
    },
    label: {
        color: '#007d00',
        fontWeight: "bold",
    }
});