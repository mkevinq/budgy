import React from 'react';
import { StyleSheet, TabBarIOS, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Budget from './screens/budget';
import EditBudget from './screens/editBudget';
import Stats from './screens/stats';
import Purchases from './screens/purchases';
import IndividualPurchases from './screens/individualPurchases';
import Category from './screens/category';


const PurchasesStack = createStackNavigator();
function PurchasesStackScreen() {
  return (
    <PurchasesStack.Navigator>
      <PurchasesStack.Screen name="Purchases" component={Purchases} />
      <PurchasesStack.Screen name="Individual Purchase" component={IndividualPurchases} />
    </PurchasesStack.Navigator>
  )
}

const BudgetStack = createStackNavigator();
function BudgetStackScreen() {
  return (
    <BudgetStack.Navigator>
      <BudgetStack.Screen name="Budget" component={Budget} />
      <BudgetStack.Screen name="Edit Budget" component={EditBudget} />
    </BudgetStack.Navigator>
  )
}

const StatStack = createStackNavigator();
function StatStackScreen() {
  return (
    <StatStack.Navigator>
      <StatStack.Screen name="Stats" component={Stats} />
      <StatStack.Screen name="Category" component={Category} />
    </StatStack.Navigator>
  )
}

const Tabs = createBottomTabNavigator();
function MainTabs() {
  <Tabs.Navigator initialRouteName = "Budget">
    <Tabs.Screen name="Purchases" component={PurchasesStackScreen} />
    <Tabs.Screen name="Budget" component={BudgetStackScreen} />
    <Tabs.Screen name="Stats" component={StatStackScreen} />
  </Tabs.Navigator>
}

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <BudgetStackScreen />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
