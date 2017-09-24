/**
 * Created by Gaplo917 on 20/8/2017.
 */
import React, { Component } from 'react';
import Rx from 'rxjs/Rx'

import {
  AppRegistry,
  StyleSheet,
  View,
  Platform
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
}, {
  headerMode: Platform.OS === 'ios' ? 'float' :'none',
})

const AppNavigator = TabNavigator(
  {
    Topics: {
      screen: TopicsNavigator,
      path:   '/topics',
      navigationOptions: {
        tabBarLabel: '論壇版塊',
        tabBarIcon:  ({tintColor, focused}) => (
          <Icon
            ios={focused ? 'ios-pulse' : 'ios-pulse-outline'}
            android='md-pulse'
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
    //tabBarPosition: 'bottom',
    //animationEnabled: false,
    //swipeEnabled: false,
    tabBarOptions:{
      activeTintColor: '#2a0101',
      inactiveTintColor: '#777777',
      labelStyle:      {
        fontSize: 10,
      },
      indicatorStyle:  {
        backgroundColor: '#8fc320',
      },
      tabStyle:        {
        height: Platform.OS === 'ios' ? 50 : 30,
      },
      style:           {
        backgroundColor: '#eeeeee',
      },
    }
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

