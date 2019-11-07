const Scheduler = require('node-schedule');
const Cache = require('../cache/Cache');

class SummaryHandler {

  constructor(client) {
    this.client = client;
    this.rule = new Scheduler.RecurrenceRule();
    this.job = null;
    this.cache = new Cache();
  }

  initialize() {
    this.setup();
    this.job = Scheduler.scheduleJob(this.rule, () => {
      this.post();
    });
  }

  setup() {
    this.rule.hour = process.env.SUMMARY_RECURRING_RULE_HOUR;
    this.rule.minute = process.env.SUMMARY_RECURRING_RULE_MINUTE;
    this.rule.second = process.env.SUMMARY_RECURRING_RULE_SECOND;
  }

  post() {
    const data = {
      embeds: [
        {
          description: '**Daily Summary**',
          color: 0xFF6C36,
          fields: [
            {
              name: 'Created Subscriptions',
              value: `${this.cache.subscriptionCreations}`,
              inline: true
            },
            {
              name: 'Changed Subscriptions',
              value: `${this.cache.subscriptionChanges}`,
              inline: true
            },
            {
              name: '-',
              value: '-',
              inline: false
            },
            {
              name: 'Scheduled Cancellations',
              value: `${this.cache.subscriptionCancellationSchedules}`,
              inline: true
            },
            {
              name: 'Cancelled Subscriptions',
              value: `${this.cache.subscriptionCancellations}`,
              inline: true
            },
            {
              name: '-',
              value: '-',
              inline: false
            },
            {
              name: 'Reactivated Subscriptions',
              value: `${this.cache.subscriptionReactivations}`,
              inline: true
            },
            {
              name: 'Renewed Subscriptions',
              value: `${this.cache.subscriptionRenewals}`,
              inline: true
            },
            {
              name: '-',
              value: '-',
              inline: false
            },
            {
              name: 'Succeeded Payments',
              value: `${this.cache.paymentSuccesses}`,
              inline: true
            },
            {
              name: 'Failed Payments',
              value: `${this.cache.paymentFailures}`,
              inline: true
            },
            {
              name: '-',
              value: '-',
              inline: false
            },
            {
              name: 'Generated Invoices',
              value: `${this.cache.invoiceGenerations}`,
              inline: true
            },
            {
              name: 'Created Transactions',
              value: `${this.cache.transactionCreations}`,
              inline: true
            },
          ],
          timestamp: new Date()
        }
      ]
    };

    this.client.webhookPoster.post(data, process.env.DISCORD_SUMMARY_WEBHOOK_URL);
  }
}

module.exports = SummaryHandler;
