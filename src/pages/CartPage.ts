import { Page, expect } from '@playwright/test';
import { CartSelectors } from '../selectors/cart.selectors';
import { Product } from '../models/Product';

export class CartPage {
  constructor(private page: Page) {}

  async verifyProductInCart(expectedProduct: Product): Promise<void> {
    // Ensure we are on cart page
    await expect(this.page).toHaveURL(/view_cart/);

    // Wait for page to be fully loaded
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');

    const cartRows = this.page.locator(CartSelectors.cartItems.row);

    // Wait for cart rows with a reasonable timeout
    try {
      await cartRows.first().waitFor({ state: 'visible', timeout: 10000 });
    } catch (error) {
      // Take a screenshot for debugging
      await this.page.screenshot({ path: 'cart-empty-error.png', fullPage: true });
      
      // Check page content for debugging
      const pageContent = await this.page.content();
      console.log('Cart page HTML snippet:', pageContent.substring(0, 500));
      
      throw new Error(
        `Cart is empty. Product was not added before navigating to cart. ` +
        `Expected product: ${expectedProduct.name}. ` +
        `Screenshot saved as cart-empty-error.png. ` +
        `Check if the product was successfully added before navigation.`
      );
    }

    // Verify cart has items
    const count = await cartRows.count();
    expect(
      count,
      `Cart should have at least 1 item but found ${count}`
    ).toBeGreaterThan(0);

    // Wait for product names to be loaded
    await cartRows.locator(CartSelectors.cartItems.productName).first().waitFor({ 
      state: 'visible', 
      timeout: 5000 
    });

    const productNames = await cartRows
      .locator(CartSelectors.cartItems.productName)
      .allTextContents();

    const productExists = productNames.some(name =>
      name.toLowerCase().includes(expectedProduct.name.toLowerCase())
    );

    expect(
      productExists, 
      `Product "${expectedProduct.name}" not found in cart. Found products: ${productNames.join(', ')}`
    ).toBeTruthy();
  }

  async verifyProductPrice(productName: string, expectedPrice: string): Promise<void> {
    const cartRows = this.page.locator(CartSelectors.cartItems.row);
    
    // Wait for cart rows to be visible
    await expect(cartRows.first()).toBeVisible({ timeout: 5000 });
    
    const count = await cartRows.count();
    expect(count, 'No products found in cart').toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const row = cartRows.nth(i);

      const name = await row
        .locator(CartSelectors.cartItems.productName)
        .textContent();

      if (name?.toLowerCase().includes(productName.toLowerCase())) {
        const price = await row
          .locator(CartSelectors.cartItems.productPrice)
          .textContent();

        expect(price?.trim()).toBe(expectedPrice);
        return;
      }
    }

    throw new Error(`Product "${productName}" not found in cart`);
  }

  async getCartItemsCount(): Promise<number> {
    const cartRows = this.page.locator(CartSelectors.cartItems.row);
    
    // Wait for the cart to load
    await this.page.waitForLoadState('networkidle');
    
    return await cartRows.count();
  }

  async removeFirstProduct(): Promise<string> {
    const firstRow = this.page.locator(CartSelectors.cartItems.row).first();

    await expect(firstRow).toBeVisible();

    const productName =
      (await firstRow.locator(CartSelectors.cartItems.productName).textContent()) || '';

    await firstRow.locator(CartSelectors.cartItems.deleteButton).click();

    // Wait until row disappears
    await expect(firstRow).toBeHidden({ timeout: 5000 });

    return productName.trim();
  }

  async verifyProductRemoved(productName: string): Promise<void> {
    // Wait for DOM to update after deletion
    await this.page.waitForTimeout(500);
    
    const cartRows = this.page.locator(CartSelectors.cartItems.row);
    const count = await cartRows.count();

    if (count === 0) {
      // Cart empty = success
      return;
    }

    const productNames = await cartRows
      .locator(CartSelectors.cartItems.productName)
      .allTextContents();

    const productExists = productNames.some(name =>
      name.toLowerCase().includes(productName.toLowerCase())
    );

    expect(productExists, `Product "${productName}" should have been removed from cart`).toBeFalsy();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.locator(CartSelectors.checkout.proceedButton).click();
    await this.page.waitForURL(/checkout/, { timeout: 10000 });
  }

  /**
   * Navigate to cart page and wait for it to load
   */
  async navigateToCart(): Promise<void> {
    await this.page.goto('/view_cart');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for cart to have at least one item
   * Useful to call after adding a product
   */
  async waitForCartToHaveItems(timeoutMs: number = 10000): Promise<void> {
    const cartRows = this.page.locator(CartSelectors.cartItems.row);
    await expect(cartRows.first()).toBeVisible({ timeout: timeoutMs });
  }

  /**
   * Check if cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    const cartRows = this.page.locator(CartSelectors.cartItems.row);
    const count = await cartRows.count();
    return count === 0;
  }

  /**
   * Get all product names in cart
   */
  async getAllProductNames(): Promise<string[]> {
    const cartRows = this.page.locator(CartSelectors.cartItems.row);
    
    await this.page.waitForLoadState('networkidle');
    
    const count = await cartRows.count();
    
    if (count === 0) {
      return [];
    }

    const productNames = await cartRows
      .locator(CartSelectors.cartItems.productName)
      .allTextContents();

    return productNames.map(name => name.trim());
  }
}