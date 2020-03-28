const WebhookEvent = require('../../lib/webhook/events/WebhookEvent');

class SubscriptionReactivatedEvent extends WebhookEvent {

  constructor(client) {
    super(client, 'subscription_reactivated');
  }

  async run() {
    console.info('Subscription reactivated!');
    this.client.summaryHandler.cache.subscriptionReactivations++;
  }
}

module.exports = SubscriptionReactivatedEvent;
