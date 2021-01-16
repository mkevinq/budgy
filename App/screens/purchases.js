import React from 'react';
import { View, FlatList, Text } from 'react-native';
import PurchaseItem from '../components/purchaseItem';

const temp = [
    {
        id: '1',
        store: 'Food Basics',
        date: '01/10/2021',
        total: '$50.50'
    },
    {
        id: '2',
        store: 'LCBO',
        date: '01/10/2021',
        total: '$25.49'
    },
    {
        id: '3',
        store: 'Rahim\'s',
        date: '01/10/2021',
        total: '$10.69'
    }
]
export default class Purchases extends React.Component {
    render() {
        // const renderItem = ({ item }) => {
        //     <purchaseItem store={item.store} date={item.date} total={item.total} />
        // }

        return(
            <FlatList
                data={temp}
                renderItem={({ item }) => (
                    <PurchaseItem store={item.store} date={item.date} total={item.total} />
                )}
                // requires keyExtractor(), which will use unique IDs for each purchase
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text>No purchases</Text>}
            />
        )
    }
}