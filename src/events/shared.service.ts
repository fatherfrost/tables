import { Event } from './eventHandler';

export class SharedService {
  public static events: Event[] = [];

  public static subscribeToEvent(event: Event, callback) {
    SharedService.events.push(event);
    const eventFound = SharedService.events.find((item) => item.name === event.name);
    callback(eventFound);
  }
}
