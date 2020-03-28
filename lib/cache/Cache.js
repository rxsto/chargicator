class Cache {

  constructor() {
    this.subscriptionCreations = 0;
    this.subscriptionChanges = 0;
    this.subscriptionCancellationSchedules = 0;
    this.subscriptionCancellationScheduleRemovals = 0;
    this.subscriptionCancellations = 0;
    this.subscriptionReactivations = 0;
    this.subscriptionRenewals = 0;
    this.paymentSuccesses = 0;
    this.paymentFailures = 0;
    this.invoiceGenerations = 0;
  }

  clear() {
    this.subscriptionCreations = 0;
    this.subscriptionChanges = 0;
    this.subscriptionCancellationSchedules = 0;
    this.subscriptionCancellationScheduleRemovals = 0;
    this.subscriptionCancellations = 0;
    this.subscriptionReactivations = 0;
    this.subscriptionRenewals = 0;
    this.paymentSuccesses = 0;
    this.paymentFailures = 0;
    this.invoiceGenerations = 0;
  }
}

module.exports = Cache;
