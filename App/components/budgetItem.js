import React from 'react';
import { StyleSheet,TextInput, Text, View } from 'react-native';

export default function budgetItem(props) {
    return (
        <View>
            <Text style={{fontSize: 24, textDecorationLine: "underline"}}>{props.category}</Text>
            <View style={{flexDirection: "row", alignItems: "center", flex: 1}}>
                <Text>$</Text>
                <TextInput onChangeText={(text) => props.updateBudget(props.id, isNaN(parseFloat(text)) ? 0 : parseFloat(text))}>{props.amount}</TextInput>
            </View>
        </View>
    );
}
