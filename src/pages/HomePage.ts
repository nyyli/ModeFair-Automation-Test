import { Page } from '@playwright/test';
import { HomeSelectors } from '../selectors/home.selectors';

export class HomePage {
  constructor(private page: Page) {}

  async navigateToLoginPage(): Promise<void> {
    await this.page.click(HomeSelectors.navigation.loginLink);
    await this.page.waitForURL('**/login');
  }

  async navigateToProductsPage(): Promise<void> {
    await this.page.click(HomeSelectors.navigation.productsLink);
    await this.page.waitForURL('**/products');
  }

  async navigateToCart(): Promise<void> {
    await this.page.click(HomeSelectors.navigation.cartLink);
    await this.page.waitForURL('**/view_cart');
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.page.locator(HomeSelectors.user.loggedInAs).isVisible();
  }

  async getLoggedInUsername(): Promise<string> {
    return await this.page.locator(HomeSelectors.user.username).textContent() || '';
  }

  async logout(): Promise<void> {
    await this.page.click(HomeSelectors.navigation.logoutLink);
    await this.page.waitForURL('**/login');
  }
}