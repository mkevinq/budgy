import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, Platform } from 'react-native';
import AddItem from '../components/addItem';
import * as ImagePicker from 'expo-image-picker';

export default class addPurchase extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            date: "01/01/2001",
            location: "here",
            image:null,
            total: 20.00,
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
        };
    }

    static contextType = UserContext;

    componentDidMount() {
        async() => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                  alert('Sorry, we need camera permissions to make this work!');
                }
            }
        }
    }
    
    getImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
            base64: true,
        })
        if (!result.cancelled) {
            this.setState({image:result})
          }
    }

    // Creating a purchase on the server
    createPurchase() {
        fetch('https://budgy-r5enpvgyka-uc.a.run.app', {
            method: 'POST /user/createPurchase',
            headers: {
                'Authorization': 'Bearer ' + this.context.token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                date: this.state.date,
                location: this.state.location,
                total: this.state.total,
                items: this.state.items 
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

    render() {
        return(
            <View>
                <View>
                    <Text>Location:</Text>
                    <TextInput>{this.state.location}</TextInput>
                </View>
                <View>
                    <Text>Date:</Text>
                    <TextInput>{this.state.date}</TextInput>
                </View>
                <View>
                    <Text>Total:</Text>
                    <TextInput>${(this.state.total).toFixed(2)}</TextInput>
                </View>

                {(this.state.items).map((item, index) => {
                    return(
                        <View>
                            <AddItem name={item.name} cost={item.cost} category={item.category} number={index + 1}/>
                            <Button
                                title="DELETE"
                                 onPress={() => {
                                     alert("Deleted ".concat((this.state.items)[index].name));
                                     let itemList = (this.state.items);
                                     itemList.splice(index, 1);
                                     this.setState({items: itemList});
                                 }}
                            />
                        </View>
                    )
                })}
                <Button title="ADD MORE" />
                <Button title="Pick an image from camera roll" onPress={this.getImage} />
            </View>
        )
    }
}