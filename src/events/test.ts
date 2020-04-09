import { EventHandler } from './eventHandler';

const eventNames = ['console-log'];

export class Test extends EventHandler {
  constructor() {
    super();

    const events = eventNames.map(name => {
      return {
        name: name,
        callback: this.gotNotificationHandler
      };
    });

    // this.subscribeToEvents(events);
  }

  gotNotificationHandler(data) {
    console.log(data);
  }
}
