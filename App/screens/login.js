import React from 'react';
import { TextInput, View, Button } from 'react-native';
import firebase from '../firebaseConfig';
import UserContext from '../userContext';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    static contextType = UserContext;

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            this.context.updateUserData(user);
            this.props.navigation.navigate("Main Tabs");
        })
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
            this.props.navigation.navigate("Main Tabs");
        })
        .catch(err => {
            console.log(err);
        })
    }

    onRegister = () => {
        this.props.navigation.navigate("Register");
    }

    render() {
        return (
            <View>
                <TextInput onChangeText={this.updateEmail}></TextInput>
                <TextInput onChangeText={this.updatePassword}></TextInput>
                <Button title="Login" onPress={this.onLogin}></Button>
                <Button title="Make an account" onPress={this.onRegister}></Button>
            </View>
        )
    }
}
