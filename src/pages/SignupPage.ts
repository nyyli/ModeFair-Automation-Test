import { Page, expect } from '@playwright/test';
import { SignupSelectors } from '../selectors/signup.selectors';
import { CheckoutData } from '../models/Product';

export class SignupPage {
  constructor(private page: Page) {}

  async fillAccountInformation(password: string): Promise<void> {
    await expect(
      this.page.locator(SignupSelectors.form.heading).filter({ hasText: 'Enter Account' })
    ).toBeVisible();

    await this.page.check(SignupSelectors.form.titleMr);
    await this.page.fill(SignupSelectors.form.password, password);
    await this.page.selectOption(SignupSelectors.form.days, '15');
    await this.page.selectOption(SignupSelectors.form.months, '6');
    await this.page.selectOption(SignupSelectors.form.years, '1990');
  }

  async fillAddressInformation(data: CheckoutData): Promise<void> {
    await this.page.fill(SignupSelectors.form.firstName, data.firstName);
    await this.page.fill(SignupSelectors.form.lastName, data.lastName);
    await this.page.fill(SignupSelectors.form.company, data.company);
    await this.page.fill(SignupSelectors.form.address1, data.address);
    await this.page.fill(SignupSelectors.form.address2, data.address2);
    await this.page.selectOption(SignupSelectors.form.country, data.country);
    await this.page.fill(SignupSelectors.form.state, data.state);
    await this.page.fill(SignupSelectors.form.city, data.city);
    await this.page.fill(SignupSelectors.form.zipcode, data.zipcode);
    await this.page.fill(SignupSelectors.form.mobileNumber, data.mobileNumber);
  }

  async submitRegistration(): Promise<void> {
    await this.page.click(SignupSelectors.form.createAccountButton);
    await expect(this.page.locator(SignupSelectors.accountCreated.heading)).toBeVisible();
    await this.page.click(SignupSelectors.accountCreated.continueButton);
  }
}