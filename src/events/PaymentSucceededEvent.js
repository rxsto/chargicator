const WebhookEvent = require('../../lib/webhook/events/WebhookEvent');

class PaymentSucceededEvent extends WebhookEvent {

  constructor(client) {
    super(client, 'payment_succeeded');
  }

  async run() {
    console.info('Payment succeeded!');
    this.client.summaryHandler.cache.paymentSuccesses++;
  }
}

module.exports = PaymentSucceededEvent;
