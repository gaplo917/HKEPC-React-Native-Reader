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

import RxComponent from '../../components/rx/RxComponent'

export default class Tabs extends Component {
  render() {
    const items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can']
    switch (this.props.tabIndex){
      case 0:
        return (
          <List dataArray={items}
                renderRow={ (item, sec, row) => {
                  if(row % 2 === 0){
                    return (
                      <Separator bordered style={{ backgroundColor: '#ff0000'}}>
                        <Text>{row}</Text>
                      </Separator>
                    )
                  }
                  return (
                    <ListItem>
                      <Text>{item}</Text>
                    </ListItem>
                  )
                }}>
          </List>
        )
      case 1:
        return (
          <View>
            <Text> I love to blink 2</Text>
          </View>
        )
      case 2:
        return (
          <View>
            <Text> I love to blink 3</Text>
          </View>
        )
      case 3:
        return (
          <View>
            <Text> I love to blink 4</Text>
          </View>
        )
      default:
        return (
          <View></View>
        )
    }
  }
}

