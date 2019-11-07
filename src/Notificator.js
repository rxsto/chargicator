const WebhookHandler = require('../lib/webhook/WebhookHandler');
const WebhookPoster = require('../lib/webhook/WebhookPoster');
const WebhookEventHandler = require('../lib/webhook/events/WebhookEventHandler');
const DiscordManager = require('../lib/utils/DiscordManager');
const SummaryHandler = require('../lib/summary/SummaryHandler');

const { join } = require('path');

class Notificator {

  constructor() {
    this.webhookHandler = new WebhookHandler(this);
    this.webhookPoster = new WebhookPoster(this);
    this.webhookEventHandler = new WebhookEventHandler(this);
    this.discordManager = new DiscordManager(this);
    this.summaryHandler = new SummaryHandler(this);
  }

  initialize() {
    console.info('Initializing Notificator ...');
    this.webhookHandler.initialize();
    this.webhookEventHandler.initialize(join(process.cwd(), './src/events/'));
    this.summaryHandler.initialize();
  }
}

module.exports = Notificator;
