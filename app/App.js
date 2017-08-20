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

import RxComponent from './components/rx/RxComponent'
import Tabs from './layouts/tabs/Tabs'

export default class App extends RxComponent {

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

  render() {
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
          <Tabs tabIndex={this.state.tabIndex}/>
          <Text>{this.state.html}</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.rx.tabIndex.next(0)} active={this.state.tabIndex === 0}>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical onPress={() => this.rx.tabIndex.next(1)} active={this.state.tabIndex === 1}>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical onPress={() => this.rx.tabIndex.next(2)} active={this.state.tabIndex === 2}>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical onPress={() => this.rx.tabIndex.next(3)} active={this.state.tabIndex === 3}>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

}