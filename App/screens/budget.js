import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView, Dimensions, FlatList, Button } from 'react-native';
import BudgetItem from '../components/budgetItem';
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
]

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
    constructor(props) {
        super(props);
        this.state = {
            pieData: pieData,
            categoryData: categoryData
        }
    }

    updateBudget(id, amount) {
        categoryData[id - 1].amount = amount;
        pieData[id - 1].amount = amount;
        this.setState({
            categoryData: categoryData,
            pieData: pieData
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ width: "100%", height: "100%" }}>
                    <CreatePieChart pieData = {this.state.pieData}/>
                    <FlatList data={this.state.categoryData} renderItem={({item}) => <BudgetItem category={item.category} amount={item.amount} id={item.id} updateBudget={this.updateBudget.bind(this)}></BudgetItem>} keyExtractor={(item) => categoryData.id} />
                </ScrollView>
            </SafeAreaView>
        );
    }
}