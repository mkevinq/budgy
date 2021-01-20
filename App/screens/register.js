
import React from 'react';
import { Image, TextInput, View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../firebaseConfig';
import UserContext from '../userContext';

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    static contextType = UserContext;

    updateEmail = (text) => {
        this.setState({ email: text });
    }

    updatePassword = (text) => {
        this.setState({ password: text });
    }

    onRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
            console.log(user);
            user.user.sendEmailVerification()
            .then(() => {
                alert("Verification e-mail sent");
            })
            .finally(() => {
                firebase.auth().signOut()
            });
        })
        .catch(err => {
            alert(err);
        })
    }

    onLogin = () => {
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={styles.image}
                        source={require('../assets/logo.png')}
                    />
                </View>
                <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} onChangeText={this.updateEmail}></TextInput>
                <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} onChangeText={this.updatePassword}></TextInput>
                <TouchableOpacity style={styles.button} onPress={this.onRegister}>
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.onLogin}>
                    <Text style={styles.text}>Have An Account</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "white"
    },
    input: {
        paddingTop: 15,
        paddingBottom: 15,
        margin: 20,
        marginTop: 0,
        borderWidth: 5,
        borderColor: "#00b300",
        textAlign: 'center',
        fontSize: 32,
        backgroundColor: "#bfffbf"
    },
    text: {
        fontSize: 32,
        color: "#ffffff",
        textAlign: "center"
    },
    button: {
        backgroundColor: "#007d00",
        padding: 10,
        marginBottom: 20
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'contain',
    },
    header: {
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom:30
    },
})
