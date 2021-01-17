import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class AddItem extends React.Component {
    render() {
        return(
            <View>
                <Text>Item {this.props.number}</Text>
                <Text>Name:</Text>
                <TextInput>{this.props.name}</TextInput>
                <Text>Cost:</Text>
                <TextInput>${this.props.cost}</TextInput>
                <Text>Category:</Text>
                <TextInput>{this.props.category}</TextInput>
            </View>
        )
    }
}