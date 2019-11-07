const express = require('express');

class WebhookHandler {

  constructor(client) {
    this.client = client;
    this.httpClient = express();
  }

  initialize() {
    this.httpClient.use(express.json());
    this.httpClient.listen(process.env.WEBHOOK_PORT, () => console.info(`WebhookHandler is listening on ${process.env.WEBHOOK_PORT}!`));
    this.httpClient.post('/', (req, res) => {
      this.client.webhookEventHandler.handle(req);
      res.status(200).end();
    });
  }
}

module.exports = WebhookHandler;
