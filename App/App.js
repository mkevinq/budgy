import React from 'react';
import { StyleSheet, LogBox} from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from './firebaseConfig';
import Budget from './screens/budget';
import Stats from './screens/stats';
import Purchases from './screens/purchases';
import IndividualPurchases from './screens/individualPurchases';
import Category from './screens/category';
import Login from './screens/login';
import Register from './screens/register';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserContext from './userContext';
import addPurchase from './screens/addPurchase';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
LogBox.ignoreLogs(['Error: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications


const PurchasesStack = createStackNavigator();
function PurchasesStackScreen() {
  return (
    <PurchasesStack.Navigator headerMode = "none" initialRouteName = "Purchases">
      <PurchasesStack.Screen name="Purchases" component={Purchases} />
      <PurchasesStack.Screen name = "Add Purchase" component={addPurchase} />
      <PurchasesStack.Screen name="Individual Purchase" component={IndividualPurchases} />
    </PurchasesStack.Navigator>
  )
}

const BudgetStack = createStackNavigator();
function BudgetStackScreen() {
  return (
    <BudgetStack.Navigator headerMode = "none" initialRouteName = "Budget">
      <BudgetStack.Screen name="Budget" component={Budget} />
    </BudgetStack.Navigator>
  )
}

const StatStack = createStackNavigator();
function StatStackScreen() {
  return (
    <StatStack.Navigator headerMode = "none" initialRouteName = "Stats">
      <StatStack.Screen name="Stats" component={Stats} />
      <StatStack.Screen name="Category" component={Category} />
    </StatStack.Navigator>
  )
}

const Tabs = createBottomTabNavigator();
function MainTabs() {
  return (
    <Tabs.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Purchases') {
          iconName = focused
            ? 'pricetag'
            : 'pricetag-outline';
        } else if (route.name === 'Budget') {
          iconName = focused ? 'wallet' : 'wallet-outline';
        }
        else if (route.name === 'Stats') {
          iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}tabBarOptions = {{activeTintColor: "#00b300", inactiveTintColor:"#007d00", activeBackgroundColor:"#bfffbf" }}headerMode = "none" initialRouteName = "Purchases">
      <Tabs.Screen name="Purchases" component={PurchasesStackScreen} />
      <Tabs.Screen name="Budget" component={BudgetStackScreen} />
      <Tabs.Screen name="Stats" component={StatStackScreen} />
    </Tabs.Navigator>
  )
}

const MainStack = createStackNavigator();
function MainStackScreens() {
  return (
    <MainStack.Navigator headerMode = "none" initialRouteName = "Login">
      <MainStack.Screen name = "Login" component = {Login} />
      <MainStack.Screen name = "Register" component = {Register} />
      <MainStack.Screen name = "Main Tabs" component = {MainTabs} />
    </MainStack.Navigator>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      token: "",
      updateUserData: this.updateUserData.bind(this)
    };
    this.navigation = React.createRef();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.updateUserData(user);
      if (user.emailVerified) {
          this.navigation.current.navigate("Main Tabs");
      } else {
          this.navigation.current.navigate("Login");
      }
    })
  }

  updateUserData(user) {
    if (user) {
      user.getIdToken()
      .then((token) => {
        this.setState({ userData: user, token: token });
      })
    } else {
      this.setState({ userData: {}, token: "" })
    }
  }

  render() {
    return (
      <UserContext.Provider value={ this.state }>
        <NavigationContainer ref={ this.navigation }>
          <MainStackScreens />
        </NavigationContainer>
      </UserContext.Provider>
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
