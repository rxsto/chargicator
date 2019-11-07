const WebhookEvent = require('../../lib/webhook/events/WebhookEvent');

class SubscriptionCancellationScheduledEvent extends WebhookEvent {

  constructor(client) {
    super(client, 'subscription_cancellation_scheduled');
  }

  async run() {
    this.client.summaryHandler.cache.subscriptionCancellationSchedules++;
  }
}

module.exports = SubscriptionCancellationScheduledEvent;
