export interface Product {
    name: string;
    price: string;
    category?: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
    totalPrice: string;
  }
  
  export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface CheckoutData {
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }
  
  export interface PaymentData {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }