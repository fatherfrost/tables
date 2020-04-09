import { EventHandler } from './events/eventHandler';

export function EventDecorator(value: string | string[]) {
  const eventsArr = [];
  if(typeof value === 'string') {
    eventsArr.push(value);
  }

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const events = eventsArr.map(name => {
      return {
        name: name,
        callback: descriptor.value
    };
    });

    EventHandler.subscribeToEvents(events);
  };
}
