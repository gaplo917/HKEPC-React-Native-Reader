/**
 * Created by Gaplo917 on 20/8/2017.
 */
import React, { Component } from 'react';
import Rx from 'rxjs/Rx'

import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Title,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Separator
} from 'native-base'

import RxComponent from './components/rx/RxComponent'

import {TopicsTab, AboutTab, FeaturesTab, FavouriteTab} from './layouts/tabs'

import {
  TabRouter,
  TabNavigator,
  StackNavigator
} from 'react-navigation'


const MainTabNavigator = TabNavigator(
  {
    Topics: {
      screen: TopicsTab,
      path:   'topics',
    },
    Favourite: {
      screen: FavouriteTab,
      path:   'favourite',
    },
    Features: {
      screen: FeaturesTab,
      path:   'features',
    },
    About: {
      screen: AboutTab,
      path:   'about',
    }
  },
  {
    // Change this to start on a different tab
    initialRouteName: 'Topics',
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
)

const AppNavigator = StackNavigator({
  Root: {
    screen: MainTabNavigator
  },
  // NotifSettings: {
  //   screen: MyNotificationsSettingsScreen,
  //   navigationOptions: {
  //     title: 'Notifications',
  //   },
  // },
  // Profile: {
  //   screen: MyProfileScreen,
  //   path: '/people/:name',
  //   navigationOptions: ({ navigation }) => {
  //     title: `${navigation.state.params.name}'s Profile!`;
  //   },
  // },
})

export default class App extends RxComponent {

  constructor(){
    super()

  }

  render() {
    return (
      <AppNavigator ref={nav => { this.navigator = nav }}/>
    )
  }

}

