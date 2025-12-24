import { Page, expect } from '@playwright/test';
import { CheckoutSelectors } from '../selectors/checkout.selectors';

export class CheckoutPage {
  constructor(private page: Page) {}

  async verifyCheckoutPage(): Promise<void> {
    await expect(this.page.locator(CheckoutSelectors.address.deliveryAddress)).toBeVisible();
    await expect(this.page.locator(CheckoutSelectors.address.billingAddress)).toBeVisible();
  }

  async addOrderComment(comment: string): Promise<void> {
    await this.page.fill(CheckoutSelectors.comment.textarea, comment);
  }

  async placeOrder(): Promise<void> {
    await this.page.click(CheckoutSelectors.placeOrder.button);
    await this.page.waitForURL('**/payment');
  }
}