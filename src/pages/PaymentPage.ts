import { Page, expect } from '@playwright/test';
import { PaymentSelectors } from '../selectors/payment.selectors';
import { PaymentData } from '../models/Product';

export class PaymentPage {
  constructor(private page: Page) {}

  async fillPaymentDetails(paymentData: PaymentData): Promise<void> {
    await this.page.fill(PaymentSelectors.form.nameOnCard, paymentData.nameOnCard);
    await this.page.fill(PaymentSelectors.form.cardNumber, paymentData.cardNumber);
    await this.page.fill(PaymentSelectors.form.cvc, paymentData.cvc);
    await this.page.fill(PaymentSelectors.form.expiryMonth, paymentData.expiryMonth);
    await this.page.fill(PaymentSelectors.form.expiryYear, paymentData.expiryYear);
  }

  async confirmPayment(): Promise<void> {
    await this.page.click(PaymentSelectors.form.payButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyOrderSuccess(): Promise<void> {
    await expect(this.page.locator(PaymentSelectors.confirmation.successMessage)).toBeVisible({
      timeout: 10000,
    });
  }
}