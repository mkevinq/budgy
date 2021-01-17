import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AddItem from '../components/addItem';

export default class addPurchase extends React.Component {
    render() {

        // Creating a purchase on the server
        const createPurchase = () => {
            fetch('https://budgy-r5enpvgyka-uc.a.run.app', {
                method: 'POST /user/createPurchase',
                headers: {
                    'Authorization': 'Bearer ' + '', // Add web token
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    date: date,
                    location: location,
                    total: total,
                    items: items 
                })
                })
                .then((response) => response.json())
                .then((json) => {
                    return json;
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        var temp = {
            data: {
                date: "01/01/2001",
                total: 20.00,
                location: "here",
                items: [
                  {
                    _id: "oiwaefioj",
                    user: "kljasdfkjlhawef",
                    purchase: "akleshfkljawef",
                    name: "Orange",
                    cost: 2.00,
                    category: "Groceries"
                  },
                  {
                    _id: "owasdlkj",
                    user: "asdifaosudfpoai",
                    purchase: "lqkwerhjqlkwe",
                    name: "Apple",
                    cost: 10.00,
                    category: "Groceries"
                  },
                  {
                    _id: "qowierupoqiuwer",
                    user: "asdiyfpiouo",
                    purchase: "qwerqwerqwer",
                    name: "TV",
                    cost: 20.00,
                    category: "Entertainment"
                  }
                ]
              },
              status: 200
            }

        // const date = new Date();
        // const day = date.getDate();
        // const month = date.getMonth() + 1;
        // const year = date.getFullYear();

        var location = temp.data.location;
        var date = temp.data.date;
        var total = temp.data.total;

        return(
            <View>
                <View>
                    <Text>Location:</Text>
                    <TextInput>{location}</TextInput>
                </View>
                <View>
                    <Text>Date:</Text>
                    <TextInput>{date}</TextInput>
                </View>
                <View>
                    <Text>Total:</Text>
                    <TextInput>${total.toFixed(2)}</TextInput>
                </View>

                {temp.data.items.map((item, index) => {
                    return(
                        <View>
                            <AddItem name={item.name} cost={item.cost} category={item.category} number={index + 1}/>
                            <Button
                                title="DELETE"
                                onPress={() => {
                                    alert("Deleted ".concat(temp.data.items[index].name))
                                    temp.data.items.splice(index, 1) // Removes index without leaving "holes"
                                }}
                            />
                        </View>
                    )
                })}
                <Button title="ADD MORE" />
            </View>
        )
    }
}