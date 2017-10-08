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

export class PostListView extends RxComponent {
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
      headerLeft:
        <Button transparent onPress={() => navigation.goBack() }>
          <Icon name='ios-arrow-round-back' />
        </Button>
      ,
      title: `${navigation.state.params.name}`
    }
  }


  constructor(){
    super()
    this.rx = {
      isRefreshing: new Rx.BehaviorSubject(true),

      postList: () => {
        return Events.hub.getEventStream(Events.REFRESH_POST_LIST)
          .flatMap(() => {
            const {topicId} = this.props.navigation.state.params

            return APIService.instance.postList({
              topicId: topicId,
              pageNum: 1
            })
              .do(null,null,() => this.rx.isRefreshing.next(false))
          })
          .do(console.log)
          .startWith([])
      },
    }
  }

  componentDidMount(){
    super.componentDidMount()
    Events.hub.publishEvent(Events.REFRESH_POST_LIST)
  }

  render(){

    return (
      <Grid>
        <Row style={{ ...StyleSheet.flatten(styles.subHeader),height: 40 }}>
          <Col style={StyleSheet.flatten(styles.subHeaderLeftIcon)}>
            <Icon style={styles.textColor} name="ios-bonfire" />
          </Col>
          <Col style={styles.subHeaderTitle}>
            { this.state.postList && this.state.postList.totalPageNum &&
              <Text style={styles.title}>第 {this.state.postList.pageNum} 頁 ／共 {this.state.postList.totalPageNum} 頁</Text>
            }
          </Col>
          <Col style={StyleSheet.flatten(styles.subHeaderRightIcon)}>
            <Icon style={styles.textColor} name="ios-more"/>
          </Col>
        </Row>

        <Row>
          <Container>
            <Content>
              {this.state.postList.posts &&
              <List
                style={{backgroundColor: '#ffffff'}}
                dataArray={this.state.postList.posts}
                renderRow={ (post, sec, row) => {
                  console.log(post,row)
                  return (
                    <ListItem>
                      <Body>
                      <Text style={{ paddingTop: 5, paddingBottom: 5 }}>{post.name} #{post.tag}</Text>
                      <Text allowFontScaling={true} lineHeight={20} numberOfLines={1} note style={{ fontSize: 13, paddingTop: 5, paddingBottom: 5 }}>{post.author.name}</Text>
                      </Body>
                      <Right style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name='ios-arrow-forward' />
                      </Right>
                    </ListItem>
                  )
                }}
              >
              </List>
              }

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