
import React from 'react';
import { TextInput, View, Button } from 'react-native';
import firebase from '../firebaseConfig';

export default class Register extends React.Component {
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

    onRegister = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
            console.log(user);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <View>
                <TextInput onChangeText={this.updateEmail}></TextInput>
                <TextInput onChangeText={this.updatePassword}></TextInput>
                <Button title="Register" onPress={this.onRegister}></Button>
            </View>
        )
    }
}
