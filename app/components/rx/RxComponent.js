/**
 * Created by Gaplo917 on 20/8/2017.
 */
import React, { Component } from 'react';
import Rx from 'rxjs/Rx'

export default class RxComponent extends Component {
  constructor(){
    super()
    this.unmountSignal = new Rx.Subject()
    this.componentDidMountSignal = new Rx.Subject()
    this._rx = null
    this.state = {}
  }
  componentWillUnmount(){
    console.debug('[RxComponent] componentWillUnmount')
    this.unmountSignal.next(true)
  }

  componentDidMount() {
    console.debug('[RxComponent] componentDidMount')
    this.componentDidMountSignal.next(true)
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

      let sharedObs = obs.publishReplay().refCount()

      sharedObs.first(null).subscribe((initialValue) => {
        // set initial value
        this.state[key] = initialValue
      })

      sharedObs
        .skipUntil(this.componentDidMountSignal)
        .takeUntil(this.unmountSignal)
        .subscribe(x => {
          this.setState(() => ({ [key]: x }))
        })

    }
  }
}