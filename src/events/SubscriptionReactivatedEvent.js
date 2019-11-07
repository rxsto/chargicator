const WebhookEvent = require('../../lib/webhook/events/WebhookEvent');

class SubscriptionReactivatedEvent extends WebhookEvent {

  constructor(client) {
    super(client, 'subscription_reactivated');
  }

  async run() {
    this.client.summaryHandler.cache.subscriptionReactivations++;
  }
}

module.exports = SubscriptionReactivatedEvent;
