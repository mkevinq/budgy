import React from 'react';
import { StyleSheet, ScrollView, FlatList, Text, Button, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PurchaseItem from '../components/purchaseItem';
import UserContext from '../userContext';
import Header from './header';

export default class Purchases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allPurchases: []
        }
    }

    componentDidMount() {
        this.getPurchases()
    }

    static contextType = UserContext;

    // Retrieving an array of the purchase IDs
    getPurchases() {
        fetch('https://budgy-r5enpvgyka-uc.a.run.app/user/purchases', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
                'Content-type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({ allPurchases: json.data });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Retrieves information regarding a particular purchase, given the specific ID
    /*
    getPurchaseInformation(id) {
        fetch('https://budgy-r5enpvgyka-uc.a.run.app/user/purchase/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
                'Content-type': 'application/json'
            }})
            .then((response) => response.json())
            .then((json) => {
                this.setState(prevState => ({ mappedPurchases: [...prevState.mappedPurchases, json.data] }));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    mapPurchaseInfo(purchases) {
        purchases.map(purchase => this.getPurchaseInformation(purchase._id));
    }
    */

    goBack = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View>
                <Header goBack={this.goBack} />
                <ScrollView>
                    <FlatList
                        data={this.state.allPurchases}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Individual Purchase", { purchase: item })}>
                                <PurchaseItem location={item.location} date={item.date} total={item.total} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item._id} // Requires a unique key that can be given to each new item
                        ListEmptyComponent={<Text>No purchases</Text>}
                    />
                    <Button title="New Purchase" onPress={() => this.props.navigation.navigate("Add Purchase")} style={{}} />
                </ScrollView>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    button: {

    }
});