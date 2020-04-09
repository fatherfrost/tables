export interface Event {
  name: string;
  callback: any;
}

export interface EmittedEvent {
  name: string;
  data: object;
}

export abstract class EventHandler {
  public static events: Event[] = [];

  public static emit(event: EmittedEvent): void {
    for (const ev of this.events) {
      if (ev.name === event.name) {
        ev.callback(event.data);
      }
    }
  }

  public static subscribeToEvents(events: Event[]) {
    events.forEach((event) => {
      this.subscribeToEvent(event, (callback) => {
        // this.events.push(callback);
      });
    })
  }

  public static subscribeToEvent(event: Event, callback) {
    this.events.push(event);
    const eventFound = this.events.find((item) => item.name === event.name);
    callback(eventFound);
  }
}
