import React, { useState } from 'react';
import { Text, ScrollView, SafeAreaView, Dimensions, FlatList, Button } from 'react-native';
import budgetItem from '../components/budgetItem';
import CreatePieChart from '../components/createPieChart';

const pieData = [
    {
        name: "Groceries",
        amount: 215,
        color: "green",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Miscellaneous",
        amount: 280,
        color: "blue",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Entertainment",
        amount: 200,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];

const categoryData = [
    {
        category: pieData[0].name,
        amount: pieData[0].amount,
        id: 1
    },
    {
        category: pieData[1].name,
        amount: pieData[1].amount,
        id: 2
    },
    {
        category: pieData[2].name,
        amount: pieData[2].amount,
        id: 3
    }
]

export default class Budget extends React.Component{
    render(){
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ width: "100%", height: "100%" }}>
                    <CreatePieChart pieData = {pieData}/>
                    <FlatList data={categoryData} renderItem={budgetItem} keyExtractor={categoryData.id} />
                    <Button title="Edit Budget"
                        onPress={() => this.props.navigation.navigate('Edit Budget')} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}