/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native'

import App from './app/App'

export default class HKEPC_RN extends Component {

  constructor(){
    super()
  }

  render() {
    return (
      <App/>
    )
  }

}

AppRegistry.registerComponent('HKEPC_RN', () => HKEPC_RN)