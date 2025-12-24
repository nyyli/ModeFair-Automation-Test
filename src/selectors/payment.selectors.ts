export const PaymentSelectors = {
    form: {
      nameOnCard: '[data-qa="name-on-card"]',
      cardNumber: '[data-qa="card-number"]',
      cvc: '[data-qa="cvc"]',
      expiryMonth: '[data-qa="expiry-month"]',
      expiryYear: '[data-qa="expiry-year"]',
      payButton: '[data-qa="pay-button"]',
    },
    confirmation: {
      successMessage: '.alert-success',
      heading: 'h2[data-qa="order-placed"]',
      continueButton: '[data-qa="continue-button"]',
    },
  };