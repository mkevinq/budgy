import React, { useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from './header';

export default class addPurchase extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            date: "01/17/2021",
            location: "",
            image:null,
            total: 0,
            items: []
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
            quality: 0.1,
            base64: true,
        })
        if (!result.cancelled) {
            fetch('https://budgy-r5enpvgyka-uc.a.run.app/user/upload', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + this.context.token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    imgb64: result.base64
                })
                })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json.data);
                    this.setState({date: json.data.date, total: json.data.total, location: json.data.purchase.location, items: json.data.items});
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    // Creating a purchase on the server
    createPurchase() {
        fetch('https://budgy-r5enpvgyka-uc.a.run.app/user/createPurchase', {
            method: 'POST',
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

    textHandler(text, attribute) {
        this.setState({attribute: text});
    }

    textHandlerItems(text, index, attribute) {
        let updatedList = this.state.items;
        updatedList[index][attribute] = text;
        this.setState({items: updatedList});
    }

    goBack = () => {
		this.props.navigation.goBack();
    };

    render() {
        return(
            <View style = {{flex:1}}>
                <Header goBack={this.goBack} />
                <Button title="Pick an image from camera roll" onPress={this.getImage} />
                <ScrollView style={{}}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 30}}>Location: </Text>
                        <TextInput onChangeText = {(text) => {this.setState({"location": text});}} style={{borderWidth: 1, padding: 5, width: 240, fontSize: 20}}>{this.state.location}</TextInput>
                    </View>
                    <View style={{flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 30}}>Date: </Text>
                        <TextInput onChangeText = {(text) => {this.setState({"date": text});}} style={{borderWidth: 1, padding: 5, width: 240, fontSize: 20}}>{this.state.date}</TextInput>
                    </View>
                    <View style={{flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 30}}>Total: </Text>
                        <TextInput onChangeText = {(text) => {this.setState({"total": parseFloat(text)});}} style={{borderWidth: 1, padding: 5, width: 240, fontSize: 20}}>{this.state.total}</TextInput>
                    </View>

                    {(this.state.items).map((item, index) => {
                        return(
                            <View>
                                {/* <AddItem name={item.name} cost={item.cost} category={item.category} number={index + 1}/> */}
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontSize: 20}}>Name: </Text>
                                    <TextInput onChangeText = {(text) => {this.textHandlerItems(text, index, "name")}} style={{borderWidth: 1, padding: 5, width: 240, fontSize: 10}}>{item.name}</TextInput>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontSize: 20}}>Cost: </Text>
                                    <TextInput onChangeText = {(text) => {this.textHandlerItems(text, index, "cost")}} style={{borderWidth: 1, padding: 5, width: 240, fontSize: 10}}>{item.cost}</TextInput>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontSize: 20}}>Category: </Text>
                                    <TextInput onChangeText = {(text) => {this.textHandlerItems(text, index, "category")}} style={{borderWidth: 1, padding: 5, width: 240, fontSize: 10}}>{item.category}</TextInput>
                                </View>
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
                    <Button
                        title="ADD MORE"
                        onPress={() => {
                            let updatedItemList = this.state.items;
                            updatedItemList.push({
                                name: "",
                                cost: 0.00,
                                category: ""
                            });
                            this.setState({items: updatedItemList});
                        }}
                    />
                    <Button
                        title="CONFIRM"
                        onPress={() => {
                            this.createPurchase();
                            alert("Created new purchase entry");
                        }}
                    />
                </ScrollView>
            </View>
        )
    }
}