import React from 'react';
import { View, FlatList, Text } from 'react-native';

export default class PurchaseItem extends React.Component {
    render() {
        return(
            <View style={{borderBottomWidth: 5}}>
                <Text>{this.props.store}</Text>
                <Text>{this.props.date}</Text>
                <Text>{this.props.total}</Text>
            </View>
        )
    }
}