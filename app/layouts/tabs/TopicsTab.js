/**
 * Created by Gaplo917 on 20/8/2017.
 */
import React, { Component } from 'react';
import Rx from 'rxjs/Rx'
import { View, Image, RefreshControl } from 'react-native'
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
  Separator,
  Thumbnail,
  Spinner
} from 'native-base'
import RxComponent from "../../components/rx/RxComponent"
import APIService from "../../api/APIService"
import * as Events from "../../events"

export class TopicsTab extends RxComponent {
  static navigationOptions = props => {
    const { navigation } = props
    const { state, setParams } = navigation
    const { params } = state

    return {
      headerRight:
        <Button transparent onPress={() => Events.hub.publishEvent(Events.REFRESH_TOPIC)}>
          <Icon name='refresh' />
        </Button>
      ,
      headerTitle: '論壇版塊',
    }
  }

  constructor(){
    super()

    this.rx = {
      selectedTopic: new Rx.Subject(),
      isRefreshing: new Rx.BehaviorSubject(true),

      topics(){
        return Events.hub.getEventStream(Events.REFRESH_TOPIC)
          .flatMap(() => {
            return APIService.instance.topicList()
              .do(null,null,() => this.isRefreshing.next(false))
          })

          .do(console.log)
          .startWith([])
      }
    }

  }

  render(){
    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => Events.hub.publishEvent(Events.REFRESH_TOPIC) }
            />
          }>
          <List style={{backgroundColor: '#ffffff'}}
                button={true}
                dataArray={this.state.topics}
                renderRow={ (topic, sec, row) => {
                  if(topic.groupName){
                    return (
                      <Separator bordered style={{backgroundColor: '#8fc320'}}>
                        <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 16}}>{topic.groupName}</Text>
                      </Separator>
                    )
                  }
                  else if (topic.name){
                    return (
                      <ListItem avatar onPress={() => this.props.navigation.navigate('PostListView', { name : topic.name, topicId: topic.id })}>
                        <Left>
                          <Thumbnail source={{ uri: topic.image }} small />
                        </Left>
                        <Body>
                        <Text style={{ paddingTop: 5, paddingBottom: 5 }}>{topic.name}</Text>
                        <Text allowFontScaling={true} lineHeight={20} numberOfLines={1} note style={{ fontSize: 13, paddingTop: 5, paddingBottom: 5 }}>{topic.description}</Text>
                        </Body>
                        <Right style={{justifyContent: 'center', alignItems: 'center'}}>
                          <Icon name='ios-arrow-forward' />
                        </Right>
                      </ListItem>
                    )
                  }
                  else {
                    return (
                      <View/>
                    )
                  }
                }}>
          </List>
        </Content>
      </Container>

    )
  }

  componentDidMount(){
    super.componentDidMount()
    Events.hub.publishEvent(Events.REFRESH_TOPIC)
  }
}