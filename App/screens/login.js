import React from 'react';
import { TextInput, View, Button } from 'react-native';
import firebase from '../firebaseConfig';

export default class Login extends React.Component {
    state = {
        email: "",
        password: ""
    }

    updateEmail = (text) => {
        this.setState({ email: text });
    }

    updatePassword = (text) => {
        this.setState({ password: text });
    }

    onLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
            console.log(user);
        })
    }

    render() {
        return (
            <View>
                <TextInput onChangeText={this.updateEmail}></TextInput>
                <TextInput onChangeText={this.updatePassword}></TextInput>
                <Button title="Login" onPress={this.onLogin}></Button>
            </View>
        )
    }
}
