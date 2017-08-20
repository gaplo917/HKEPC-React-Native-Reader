/**
 * Created by Gaplo917 on 20/8/2017.
 */
import React, { Component } from 'react';
import Rx from 'rxjs/Rx'

import Ionicons from 'react-native-vector-icons/Ionicons'

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

export class AboutTab extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '關於',
    tabBarIcon:  ({tintColor, focused}) => (
      <Ionicons
        name={focused ? 'ios-information-circle' : 'ios-information-circle-outline'}
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
        <Header>
          <Left>
          </Left>
          <Body>
          <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='refresh' />
            </Button>
          </Right>
        </Header>
        <Content>
          <Text> I love to blink 4</Text>
        </Content>
      </Container>
    )
  }
}