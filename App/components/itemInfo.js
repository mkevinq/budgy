import React from 'react';
import { View, Text } from 'react-native';

export default class ItemInfo extends React.Component {
    render() {
        return(
            <View>
                <Text>{this.props.name}</Text>
                <Text>${this.props.cost.toFixed(2)}</Text>
            </View>
        )
    }
}