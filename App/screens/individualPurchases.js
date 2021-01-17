import React from 'react';
import { View, SectionList, Text } from 'react-native';
import ItemInfo from '../components/itemInfo';
import UserContext from '../userContext';

export default class IndividualPurchases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                "Groceries",
                "Entertainment",
                "Miscellaneous"
            ],
            tempItems: [],
            items: [],
            total: 0
        }
    }

    static contextType = UserContext;

    componentDidMount() {
        const { purchase } = this.props.route.params;
        this.getPurchases(purchase._id)
    }

    // Retrieving an array of the items involved in a particular purchase, given the purchase ID
    getPurchases(purchase_id) {
        fetch('https://budgy-r5enpvgyka-uc.a.run.app/user/items/' + purchase_id, {
            method: 'GET' ,
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
                'Content-type': 'application/json'
            }})
            .then((response) => response.json())
            .then((json) => {
                this.getCategories(json.data)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getCategories(items) {
        // Iterate through each category, and appending a new key:value pair to the list of items, with categories
        let allItems = [];

        for (category of this.state.categories) {
            allItems.push({
                'title': category,
                'data': []
            })
        }
        
        // Iterate through each item in the purchase, and append it to the end of its corresponding category array
        
        // Iterate through each purchase, where item will be each item
        for (item of items) {
            // Iterate through each category, where category will be each element in the array, that consists of 2 key:value pairs
            for (i = 0; i < allItems.length; i++) {
                console.log(item);
                if (item["category"] === allItems[i].title) {
                    allItems[i]["data"].push(item);
                }
            }
        }
        this.setState({items: allItems});
    }

    render() {
        return(
            <View>
                <Text>{this.state.location}</Text>
                <Text>{this.state.date}</Text>
                <Text>${this.state.total.toFixed(2)}</Text>
                <SectionList
                    sections={this.state.items}
                    renderSectionHeader = {({section}) => (
                        <Text>{section.title}</Text>
                    )}
                    renderItem={({item}) => 
                        <ItemInfo name={item.name} cost={item.cost} />
                    }
                    keyExtractor={item => item._id}
                    // Either remove heading or add placeholder text if the category is empty
                    ListEmptyComponent={<Text>No purchases</Text>}
                />
            </View>
        )
    }
}