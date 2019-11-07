const WebhookEvent = require('../../lib/webhook/events/WebhookEvent');

class InvoiceGeneratedEvent extends WebhookEvent {

  constructor(client) {
    super(client, 'invoice_generated');
  }

  async run() {
    this.client.summaryHandler.cache.invoiceGenerations++;
  }
}

module.exports = InvoiceGeneratedEvent;
