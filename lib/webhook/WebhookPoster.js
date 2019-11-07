const axios = require('axios');

class WebhookHandler {

  constructor(client) {
    this.client = client;
  }

  post(data, url = process.env.DISCORD_NOTIFICATION_WEBHOOK_URL) {
    axios.post(url, data).catch(error => console.error(error));
  }
}

module.exports = WebhookHandler;
