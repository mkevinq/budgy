import React, { useState } from 'react';
import { Text, ScrollView, SafeAreaView, Dimensions, FlatList, Button } from 'react-native';
import StatisticsItem from '../components/statisticsItem';
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

export default class Stats extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            sum: 0
        }
    }

    componentDidMount() {
        let sum = 0;
        for (var i = 0; i < categoryData.length; i++) {
            sum += categoryData[i].amount;
        }
        this.setState({sum: sum});
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ width: "100%", height: "100%" }}>
                    <CreatePieChart pieData = {pieData}/>
                    <Text>Breakdown: ${this.state.sum}</Text>
                    <FlatList data={categoryData} renderItem={({item}) => <StatisticsItem amount={item.amount} category={item.category}></StatisticsItem>} keyExtractor={(item) => categoryData.id} />
                </ScrollView>
            </SafeAreaView>
        )
    }
}
