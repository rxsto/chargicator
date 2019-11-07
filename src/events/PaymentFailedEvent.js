const WebhookEvent = require('../../lib/webhook/events/WebhookEvent');

class PaymentFailedEvent extends WebhookEvent {

  constructor(client) {
    super(client, 'payment_failed');
  }

  async run() {
    this.client.summaryHandler.cache.paymentFailures++;
  }
}

module.exports = PaymentFailedEvent;
