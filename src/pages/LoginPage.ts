import { Page, expect } from '@playwright/test';
import { LoginSelectors } from '../selectors/login.selectors';
import { UserCredentials } from '../models/Product';

export class LoginPage {
  constructor(private page: Page) {}

  async login(credentials: UserCredentials): Promise<void> {
    await expect(this.page.locator(LoginSelectors.login.heading)).toBeVisible();
    await this.page.fill(LoginSelectors.login.emailInput, credentials.email);
    await this.page.fill(LoginSelectors.login.passwordInput, credentials.password);
    await this.page.click(LoginSelectors.login.loginButton);
    await this.page.waitForURL('**/');
  }

  async navigateToSignup(name: string, email: string): Promise<void> {
    await expect(this.page.locator(LoginSelectors.signup.heading)).toBeVisible();
    await this.page.fill(LoginSelectors.signup.nameInput, name);
    await this.page.fill(LoginSelectors.signup.emailInput, email);
    await this.page.click(LoginSelectors.signup.signupButton);
    await this.page.waitForURL('**/signup');
  }
}