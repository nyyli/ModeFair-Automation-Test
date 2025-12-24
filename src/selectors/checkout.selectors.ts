export const CheckoutSelectors = {
    page: {
      heading: '.heading:has-text("Review Your Order")',
    },
    address: {
      deliveryAddress: '#address_delivery',
      billingAddress: '#address_invoice',
    },
    order: {
      items: '.cart_menu ~ tbody tr',
      productName: '.cart_description h4 a',
      price: '.cart_price p',
      quantity: '.cart_quantity button',
      total: '.cart_total_price',
    },
    comment: {
      textarea: 'textarea.form-control',
    },
    placeOrder: {
      button: 'a[href="/payment"]',
    },
  };