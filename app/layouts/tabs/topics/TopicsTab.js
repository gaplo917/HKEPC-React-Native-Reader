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
import RxComponent from "../../../components/rx/RxComponent";


export class TopicsTab extends RxComponent {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '論壇版塊',
    tabBarIcon:  ({tintColor, focused}) => (
      <Ionicons
        name={focused ? 'ios-pulse' : 'ios-pulse-outline'}
        size={26}
        style={{color: tintColor}}
      />
    )
  })

  constructor(){
    super()

    this.rx = {
      tabIndex: new Rx.Subject(),
      refresh: new Rx.Subject(),

      html(){
        return this.tabIndex
          .flatMap((index) => {
            return Rx.Observable
              .ajax('https://jsonplaceholder.typicode.com/posts/1')
              .map(e => e.response)
          })
          .map((response) => response.body)
      }
    }

  }
  render(){
    const items = ['Simon Mignolet','Nathaniel Clyne','Dejan Lovren','Mama Sakho','Emre Can']

    return (
      <Container>
        <Header>
          <Left>
          </Left>
          <Body>
          <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.rx.refresh.next()}>
              <Icon name='refresh' />
            </Button>
          </Right>
        </Header>
        <Content>
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
        </Content>
      </Container>

    )
  }
}