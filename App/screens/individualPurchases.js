import React from 'react';
import { View, SectionList, Text } from 'react-native';
import ItemInfo from '../components/itemInfo';

const temp = {
    location: 'Food Basics',
    date: '01/01/2001',
    total: 50.00,       
}
export default class IndividualPurchases extends React.Component {
    render() {

        // Retrieving an array of the items involved in a particular purchase, given the purchase ID
        const getPurchases = (purchase_id) => {
            fetch('https://budgy-r5enpvgyka-uc.a.run.app', {
                method: 'GET /user/items/' + purchase_id,
                headers: {
                    'Authorization': 'Bearer ', // Include Bearer token
                    'Content-type': 'application/json'
                }})
                .then((response) => response.json())
                .then((json) => {
                    return json.data.items;
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        const categories = ["Groceries", "Entertainment", "Miscellaneous"]; // Categories to check for
        var items = [];
        // Iterate through each category, and appending a new key:value pair to the list of items, with categories
        for (category of categories) {
            items.push({
                'title': category,
                'data': []
            })
        }

        const temp2 = [
            {
                _id: "oiwaefioj",
                user: "kljasdfkjlhawef",
                purchase: "akleshfkljawef",
                name: "Orange",
                cost: 2.00,
                category: "Groceries"
            },
            {
                _id: "asdfasdf",
                user: "asdfasdfasdfasdf",
                purchase: "asdfasdf",
                name: "Apple",
                cost: 5.00,
                category: "Groceries"
            },
            {
                _id: "lkj;lkj;lkj",
                user: "lkjhlkjhlkjhlkjh",
                purchase: "lkjhkjhlkhjklh",
                name: "TV",
                cost: 10.00,
                category: "Entertainment"
            }
        ]

        // Iterate through each item in the purchase, and append it to the end of its corresponding category array
        for (item of temp2) { //getPurchases(purchase_id)
            for (category of items) {
                item.category === category.title ? category.data.push(item) : {}
            }
        }

        return(
            <View>
                <Text>{temp.location}</Text>
                <Text>{temp.date}</Text>
                <Text>${temp.total.toFixed(2)}</Text>

                <SectionList
                    sections={items}
                    renderSectionHeader = {({section}) => (
                        <Text>{section.title}</Text>
                    )}
                    renderItem={({ item }) => 
                        <ItemInfo name={item.name} cost={item.cost} />
                    }
                    keyExtractor={item.id}
                    // Either remove heading or add placeholder text if the category is empty
                />
            </View>
        )
    }
}