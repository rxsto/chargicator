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
      this.cache.clear();
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
          title: '**Daily Summary**',
          description: `Today, from \`${new Date(Date.now() - 1000 * 60 * 60 * 24).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}\` to \`${new Date(Date.now()).toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })}\`, \`${this.cache.subscriptionCreations}\` new subscriptions were created. \`${this.cache.subscriptionRenewals}\` of all were renewed and \`${this.cache.subscriptionCancellations}\` were cancelled. \`${this.cache.subscriptionChanges}\` customers decided to change their subscription, \`${this.cache.subscriptionCancellationSchedules}\` scheduled a cancellation, \`${this.cache.subscriptionReactivations}\` reactivated their cancelled subscriptions and \`${this.cache.subscriptionCancellationScheduleRemovals}\` removed their scheduled cancellation. In these \`24\` hours, \`${this.cache.paymentSuccesses}\` payments succeeded and \`${this.cache.paymentFailures}\` failed. Overall, \`${this.cache.invoiceGenerations}\` invoices were generated.`,
          color: 0xFF6C36,
          timestamp: new Date()
        }
      ]
    };

    this.client.webhookPoster.post(data, process.env.DISCORD_SUMMARY_WEBHOOK_URL);
  }
}

module.exports = SummaryHandler;
