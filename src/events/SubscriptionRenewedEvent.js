const WebhookEvent = require('../../lib/webhook/events/WebhookEvent');

class SubscriptionRenewedEvent extends WebhookEvent {

  constructor(client) {
    super(client, 'subscription_renewed');
  }

  async run() {
    this.client.summaryHandler.cache.subscriptionRenewals++;
  }
}

module.exports = SubscriptionRenewedEvent;
