import { SharedService } from './shared.service';

export interface Event {
  name: string;
  callback: any;
}

export interface EmittedEvent {
  name: string;
  data: object;
}

export abstract class EventHandler {
  public static emit(event: EmittedEvent): void {
    console.log(event, ' ---------');
    console.log(SharedService.events);
    for (const ev of SharedService.events) {
      if (ev.name === event.name) {
        ev.callback(event.data);
      }
    }
  }

  public static subscribeToEvents(events: Event[]) {
    events.forEach((event) => {
      SharedService.subscribeToEvent(event, (callback) => {
        // this.eventsSubscriptions.push(callback);
      });
    })
  }
}
