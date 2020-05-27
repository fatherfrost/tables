export class Connection {
  constructor(name, channel) {
    this.collection = name;
    this.channel = channel;
  }
  collection: string;
  channel: any;
}
