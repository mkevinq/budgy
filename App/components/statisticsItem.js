import React from 'react';
import { Text, View } from 'react-native';

export default function statisticsItem({ category, amount }) {
    return (
        <View>
            <Text style={{fontSize: 24, textDecorationLine: "underline"}}>{category}</Text>
            <Text>- ${amount}</Text>
        </View>
    );
}