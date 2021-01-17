import React from 'react';
import { View, SectionList, Text } from 'react-native';
import ItemInfo from '../components/itemInfo';
import UserContext from '../userContext';

const temp = {
    location: 'Food Basics',
    date: '01/01/2001',
    total: 50.00,       
}
export default class IndividualPurchases extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [
                "Groceries",
                "Entertainment",
                "Miscellaneous"
            ],
            items: {},
        }
    }

    static contextType = UserContext;

    componentDidMount() {
        this.setState({ items: this.getPurchases(this.props.purchase_id) });
    }

    // Retrieving an array of the items involved in a particular purchase, given the purchase ID
    getPurchases(purchase_id) {
        fetch('https://budgy-r5enpvgyka-uc.a.run.app', {
            method: 'GET /user/items/' + purchase_id,
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
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

    getCategories() {
        // Iterate through each category, and appending a new key:value pair to the list of items, with categories
        let allItems;

        for (category of this.state.categories) {
            allItems = this.state.items;
            allItems.push({
                'title': category,
                'data': []
            })
        }
        
        // Iterate through each item in the purchase, and append it to the end of its corresponding category array
        
        // Iterate through each purchase, where item will be each item
        for (item of this.state.items) {
            // Iterate through each category, where category will be each element in the array, that consists of 2 key:value pairs
            for (i = 0; i < allItems.length; i++) {

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