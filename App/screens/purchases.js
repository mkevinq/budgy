import React from 'react';
import { View, FlatList, Text } from 'react-native';
import PurchaseItem from '../components/purchaseItem';
import UserContext from '../userContext';

export default class Purchases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allPurchases: []
        }
    }

    componentDidMount() {
        this.setState({ allPurchases: getPurchases() });
    }

    static contextType = UserContext;

    // Retrieving an array of the purchase IDs
    getPurchases() {
        fetch('https://budgy-r5enpvgyka-uc.a.run.app', {
            method: 'GET /user/purchases',
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
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
    getPurchaseInformation(id) {
        fetch('https://budgy-r5enpvgyka-uc.a.run.app', {
            method: 'GET /user/purchase/' + id,
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
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

    mapPurchaseInfo(purchases) {
        return purchases.map(purchase => getPurchaseInformation(purchase.id));
    }
    
    render() {
        return(
            <View>
                <FlatList
                    data={mapPurchaseInfo(this.state.allPurchases)}
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