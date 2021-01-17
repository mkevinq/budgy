import React from 'react';
import { Text, View } from 'react-native';

export default function statisticsItem({ category, amount }) {
    return (
        <View>
            <Text>{category}</Text>
            <Text>- ${amount}</Text>
        </View>
    );
}