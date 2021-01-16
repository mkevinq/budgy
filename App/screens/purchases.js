import React from 'react';
import { View, FlatList, Text } from 'react-native';
import PurchaseItem from '../components/purchaseItem';
export default class Purchases extends React.Component {
    render() {

        // Retrieving an array of the purchase IDs
        const getPurchases = () => {
            fetch('https://budgy-r5enpvgyka-uc.a.run.app', {
                method: 'GET /user/purchases',
                headers: {
                    'Authorization': 'Bearer oiwjefoijaweoigfjaosgjaa',
                    'Content-type': 'application/json'
                }})
                .then((response) => response.json())
                .then((json) => {
                    return json.data.purchases;
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        // Retrieves information regarding a particular purchase, given the specific ID
        const getPurchaseInformation = (id) => {
            fetch('https://budgy-r5enpvgyka-uc.a.run.app', {
                method: 'GET /user/purchase/' + id,
                headers: {
                    'Authorization': 'Bearer oiwjefoijaweoigfjaosgjaa',
                    'Content-type': 'application/json'
                }})
                .then((response) => response.json())
                .then((json) => {
                    return json.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        const mapPurchaseInfo = (purchases) => {
            return purchases.map(getPurchaseInformation());
        }

        return(
            <View>
                <FlatList
                    data={mapPurchaseInfo(getPurchases())}
                    renderItem={({item}) => (
                        <PurchaseItem store={item.location} date={item.date} total={item.total} />
                    )}
                    keyExtractor={item} // Requires a unique key that can be given to each new item
                    ListEmptyComponent={<Text>No purchases</Text>}
                />
            </View>
        )
    }
}