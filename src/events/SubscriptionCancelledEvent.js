const WebhookEvent = require('../../lib/webhook/events/WebhookEvent');

const ms = require('ms');

class SubscriptionCancelledEvent extends WebhookEvent {

  constructor(client) {
    super(client, 'subscription_cancelled');
  }

  async run(event) {
    const content = event.content;
    const user = await this.client.discordManager.getUser(content.customer.id);
    const data = {
      embeds: [
        {
          description: '**Subscription cancelled**',
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
            },
            {
              name: 'Cancellation date',
              value: `${this.formatDate(content.subscription.cancelled_at)}`,
              inline: false
            },
            {
              name: 'Active term',
              value: `${this.formatTime(content.subscription.cancelled_at - content.subscription.created_at)}`,
              inline: false
            },
            {
              name: 'Due invoices',
              value: `${content.subscription.due_invoices_count}`,
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

    this.client.summaryHandler.cache.subscriptionCancellations++;
  }

  formatDate(date) {
    return new Date(date * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
  }

  formatTime(time) {
    return ms(time * 1000, { long: true });
  }
}

module.exports = SubscriptionCancelledEvent;
