import React from 'react';
import { View, Text } from 'react-native';

export default class ItemInfo extends React.Component {
    render() {
        return(
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10}}>
                <Text style={{fontSize: 20}}>{this.props.name}</Text>
                <Text style={{fontSize: 20}}>${this.props.cost.toFixed(2)}</Text>
            </View>
        )
    }
}