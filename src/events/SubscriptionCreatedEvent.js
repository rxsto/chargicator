const WebhookEvent = require('../../lib/webhook/events/WebhookEvent');

class SubscriptionCreatedEvent extends WebhookEvent {

  constructor(client) {
    super(client, 'subscription_created');
  }

  async run(event) {
    const content = event.content;
    const user = await this.client.discordManager.getUser(content.customer.id);
    const data = {
      embeds: [
        {
          description: '**Subscription created**',
          color: 0xFF6C36,
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
              name: 'Next billing',
              value: `${this.formatDate(content.subscription.next_billing_at)}`,
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

    this.client.summaryHandler.cache.subscriptionCreations++;
  }

  formatDate(date) {
    return new Date(date * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });
  }
}

module.exports = SubscriptionCreatedEvent;
