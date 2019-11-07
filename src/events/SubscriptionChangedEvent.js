const WebhookEvent = require('../../lib/webhook/events/WebhookEvent');

class SubscriptionChangedEvent extends WebhookEvent {

  constructor(client) {
    super(client, 'subscription_changed');
  }

  async run() {
    this.client.summaryHandler.cache.subscriptionChanges++;
  }
}

module.exports = SubscriptionChangedEvent;
