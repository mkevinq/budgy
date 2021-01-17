import React from 'react';
import { Text,View } from 'react-native';


export default function budgetItem({ category, amount }) {
    return (
        <View>
            <Text>{category}</Text>
            <Text>${amount}</Text>
        </View>
    );
}