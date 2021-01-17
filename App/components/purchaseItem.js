import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class PurchaseItem extends React.Component {
    render() {
        return(
            <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 2}}>
                <View>
                    <Text style={{fontSize: 30}}>{this.props.location}</Text>
                    <Text style={{}}>{this.props.date}</Text>
                </View>
                <Text style={{fontSize: 25}}>${(this.props.total).toFixed(2)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        
    }
});