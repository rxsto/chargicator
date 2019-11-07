class WebhookEvent {

  constructor(client, name) {
    this.client = client;
    this.name = name;
  }

  run() {
    throw new Error('This method should be overwritten in the actual event!');
  }
}

module.exports = WebhookEvent;
