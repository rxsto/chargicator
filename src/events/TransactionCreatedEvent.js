const WebhookEvent = require('../../lib/webhook/events/WebhookEvent');

class TransactionCreatedEvent extends WebhookEvent {

  constructor(client) {
    super(client, 'transaction_created');
  }

  async run() {
    this.client.summaryHandler.cache.transactionCreations++;
  }
}

module.exports = TransactionCreatedEvent;
