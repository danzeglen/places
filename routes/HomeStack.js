import React, { useContext } from 'react';
import { Button, StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PostScreen from '../screens/PostScreen'
import SavedPlacesScreen from '../screens/SavedPlacesScreen'
import AllScreen from '../screens/AllScreen'
import NewScreen from '../screens/NewScreen'
import TrendingScreen from '../screens/TrendingScreen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AccountScreen from '../screens/AccountScreen'
import PostDetails from '../screens/PostDetails'
import Header from '../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import NotificationScreen from '../screens/NotificationScreen'
import { UserContext } from '../providers/fire'
import LoginDetailScreen from '../screens/LoginDetailScreen'

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();

const toptabBarOptions = {
  style: { backgroundColor: '#fff', paddingTop: 0, marginTop: 0 },
  labelStyle: { fontSize: 18 },
  indicatorStyle: { backgroundColor: '#2099AF', },
  activeTintColor: '#2099AF',
  inactiveTintColor: 'gray',

}

function MyTabs() {

  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <Header />
      </SafeAreaView>
      <TopTab.Navigator
        toptabBarOptions={toptabBarOptions}
        tabBarPosition='top'
      >
        <TopTab.Screen name="Trending" component={TrendingScreen} />
        <TopTab.Screen name="All" component={AllScreen} />
        <TopTab.Screen name="New" component={NewScreen} />
      </TopTab.Navigator>
    </>

  );
}


function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen options={{ headerShown: false }} name="Trending" component={MyTabs} />
      <HomeStack.Screen name="Details" component={PostDetails} />
    </HomeStack.Navigator>
  );
}

function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen options={{ headerShown: false }} name="Account" component={AccountScreen} />
      <AccountStack.Screen name="Details" component={LoginDetailScreen} />
    </AccountStack.Navigator>
  );
}


function Navigator() {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Account') {
              if (user) {
                iconName = focused
                  ? 'smileo'
                  : 'smileo';
              } else {
                iconName = focused
                  ? 'smileo'
                  : 'frowno';
              }
              size = 30
            } else if (route.name === 'Content') {
              iconName = focused ? 'pluscircle' : 'pluscircleo';
              size = 40
              color = 'dodgerblue'

            }
            else if (route.name === 'Trending') {
              iconName = focused ? 'bells' : 'bells';
              size = 30
            }
            else if (route.name === 'New') {
              iconName = focused ? 'pushpino' : 'pushpino';
              size = 30
            }
            else if (route.name === 'All') {
              iconName = focused ? 'home' : 'home';
              size = 30
            }

            // You can return any component that you like here!
            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}

        tabBarOptions={{
          showLabel: false,
          activeTintColor: '#0244ad',
          inactiveTintColor: '#a3a3a3',
          safeAreaInsets: { bottom: 0 },

          style: {
            paddingTop: 10,
            backgroundColor: 'white',
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 20,
            borderRadius: 15,
            height: 50,
          }
        }}>

        <Tab.Screen name="All" component={HomeStackScreen} />
        <Tab.Screen name="New" component={SavedPlacesScreen} />
        <Tab.Screen name="Content" component={PostScreen} />
        <Tab.Screen name="Trending" component={NotificationScreen} />
        <Tab.Screen name="Account" component={AccountStackScreen} />
      </Tab.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  }
})

export default Navigator;