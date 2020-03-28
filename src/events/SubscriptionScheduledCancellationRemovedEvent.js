const WebhookEvent = require('../../lib/webhook/events/WebhookEvent');

class SubscriptionScheduledCancellationRemoved extends WebhookEvent {

  constructor(client) {
    super(client, 'subscription_scheduled_cancellation_removed');
  }

  async run(event) {
    console.info('Subscription cancellation schedule removed!');
    const content = event.content;
    const user = await this.client.discordManager.getUser(content.customer.id);
    const data = {
      embeds: [
        {
          title: 'Subscription cancellation schedule removed',
          color: 0x8a8a8a,
          fields: [
            {
              name: 'Customer',
              value: `${user.username}#${user.discriminator} (${user.id})`,
              inline: false
            },
            {
              name: 'Plan',
              value: `${content.subscription.plan_quantity} x ${content.subscription.plan_id}`,
              inline: false
            },
            {
              name: 'Creation date',
              value: `${this.formatDate(content.subscription.created_at)}`,
              inline: false
            }
          ],
          timestamp: new Date(event.occurred_at * 1000)
        }
      ]
    };

    if (user.avatar !== null) {
      data.embeds[0].thumbnail = {
        url: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}`
      };
    }

    this.client.webhookPoster.post(data);

    this.client.summaryHandler.cache.subscriptionCancellationScheduleRemovals++;
  }

  formatDate(date) {
    return new Date(date * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
  }
}

module.exports = SubscriptionScheduledCancellationRemoved;
