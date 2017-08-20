// @flow
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
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


class Tab extends Component {
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

export default class HKEPC_RN extends Component {

  constructor(){
    super()
    this.state = {
      tabIndex: 0,
      html: "html"
    }

    this.clickTab = this.clickTab.bind(this)
  }

  clickTab(tab) {
    this.setState(prevState => ({
      tabIndex: tab
    }))

    this.fetchData()
    console.log('The link was clicked.');
  }
  async fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    const json = await response.json()
    this.setState({
      html: json.body
    })
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
            <Button transparent>
              <Icon name='refresh' />
            </Button>
          </Right>
        </Header>
        <Content>
          <Tab tabIndex={this.state.tabIndex}/>
          <Text>{this.state.html}</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.clickTab(0)} active={this.state.tabIndex === 0}>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical onPress={() => this.clickTab(1)} active={this.state.tabIndex === 1}>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical onPress={() => this.clickTab(2)} active={this.state.tabIndex === 2}>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical onPress={() => this.clickTab(3)} active={this.state.tabIndex === 3}>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

}

AppRegistry.registerComponent('HKEPC_RN', () => HKEPC_RN);
