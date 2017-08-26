/**
 * Created by Gaplo917 on 21/8/2017.
 */

import React, { Component } from 'react';
import Rx from 'rxjs/Rx'
import { StyleSheet, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Col, Row, Grid } from 'react-native-easy-grid'
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
  Separator,
  Thumbnail,
  Spinner
} from 'native-base'
import RxComponent from "../../components/rx/RxComponent"
import APIService from "../../api/APIService"
import * as Events from "../../events"

export class PostListView extends Component {
  static navigationOptions = props => {
    const { navigation } = props
    const { state, setParams } = navigation
    const { params } = state

    return {
      headerRight:
                   <Button transparent onPress={() => Events.hub.publishEvent(Events.REFRESH_POST_LIST)}>
                     <Icon name='refresh' />
                   </Button>
      ,
      title: `${navigation.state.params.name}`
    }
  }


  constructor(){
    super()
  }

  render(){
    return (
      <Grid>
        <Row style={{ ...StyleSheet.flatten(styles.subHeader),height: 40 }}>
          <Col style={StyleSheet.flatten(styles.subHeaderLeftIcon)}>
            <Icon style={styles.textColor} name="ios-bonfire" />
          </Col>
          <Col style={styles.subHeaderTitle}>
            <Text style={styles.title}>第 1 頁 ／共 1974 頁</Text>
          </Col>
          <Col style={StyleSheet.flatten(styles.subHeaderRightIcon)}>
            <Icon style={styles.textColor} name="ios-more"/>
          </Col>
        </Row>

        <Row>
          <Container>
            <Content>
              <List>
                <ListItem>
                  <Text>Simon Mignolet</Text>
                </ListItem>
                <ListItem>
                  <Text>Nathaniel Clyne</Text>
                </ListItem>
                <ListItem>
                  <Text>Dejan Lovren</Text>
                </ListItem>
              </List>
            </Content>
          </Container>
        </Row>
      </Grid>
    )
  }
}

const styles = StyleSheet.create({
  subHeader:{
    backgroundColor: '#8fc320',
  },
  textColor: {
    color: '#ffffff'
  },
  title: {
    color: '#ffffff',
    fontWeight:'600'
  },
  get subHeaderItem() {
    return {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
  get subHeaderLeftIcon(){
    return {
      ...this.subHeaderItem,
      width: 40,
    }
  },
  get subHeaderRightIcon(){
    return {
      ...this.subHeaderItem,
      width: 40,
    }
  },
  get subHeaderTitle(){
    return {
      ...this.subHeaderItem,
    }
  }
})