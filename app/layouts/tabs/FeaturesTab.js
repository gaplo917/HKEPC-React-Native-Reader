/**
 * Created by Gaplo917 on 20/8/2017.
 */
import React, { Component } from 'react';
import Rx from 'rxjs/Rx'

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


export class FeaturesTab extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `功能`,
    tabBarIcon:  ({tintColor, focused}) => (
      <Ionicons
        name={focused ? 'ios-infinite' : 'ios-infinite-outline'}
        size={26}
        style={{color: tintColor}}
      />
    )
  })
  constructor(){
    super()
  }
  render(){
    return (
      <Container>
        <Content>
          <Text>Features</Text>
        </Content>
      </Container>
    )
  }
}