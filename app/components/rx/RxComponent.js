/**
 * Created by Gaplo917 on 20/8/2017.
 */
import React, { Component } from 'react';
import Rx from 'rxjs/Rx'

export default class RxComponent extends Component {
  constructor(){
    super()
    this.unmountSignal = new Rx.Subject()
    this._rx = null
    this.state = {}
  }
  componentWillUnmount(){
    this.unmountSignal.next(true)
  }

  get rx(){
    return this._rx
  }

  set rx(factories) {
    if(this._rx !== null){
      throw Error("rx can only be set once")
    }
    this._rx = factories

    for(let key in factories){
      console.log("setting Rx state", key)

      // set initial value to null
      this.state[key] = null

      // init once
      const value = factories[key]

      // support key-value pair / function declaration
      let obs
      if(typeof value === "function"){
        obs = value.bind(this._rx)(this._rx)
      }
      else {
        obs = value
      }

      obs
        .takeUntil(this.unmountSignal)
        .subscribe(x => {
          this.setState(() => ({ [key]: x }))
        })

    }
  }
}