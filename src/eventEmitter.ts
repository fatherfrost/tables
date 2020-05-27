import { EventEmitter } from 'events';

export class EventService {
  constructor ( private eventEmitter: EventEmitter) {}

  emit(name, data) {
    this.eventEmitter.emit(name, data)
  }

  listen(event, callback) {
    this.eventEmitter.on(name, callback)
  }
}
