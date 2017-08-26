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
import {PostListView} from './layouts/post'

import {
  TabRouter,
  TabNavigator,
  StackNavigator
} from 'react-navigation'


const TopicsNavigator = StackNavigator({
  Topics: {
    screen: TopicsTab,
    path:   '/topics',
  },
  PostListView: {
    screen: PostListView,
    path: '/topics/:name',
  },
})

const AppNavigator = TabNavigator(
  {
    Topics: {
      screen: TopicsNavigator,
      path:   '/topics',
      navigationOptions: {
        tabBarLabel: '論壇版塊',
        tabBarIcon:  ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-pulse' : 'ios-pulse-outline'}
            size={26}
            style={{color: tintColor}}
          />
        )
      },
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

