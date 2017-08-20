/**
 * Created by Gaplo917 on 21/8/2017.
 */
import Rx from 'rxjs/Rx'

// singleton
export default class EventHub {
  constructor(){
    this.streams = {}
  }

  getEventStream(eventName){
    if(!this.streams[eventName]){
      this.streams[eventName] = new Rx.Subject()
    }

    return this.streams[eventName]
  }

  publishEvent(eventName, data){
    const stream = this.streams[eventName]
    if(stream){
      stream.next(data)
    }
  }
}


