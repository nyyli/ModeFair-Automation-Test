import { Page, expect, Locator } from '@playwright/test';
import { ProductsSelectors } from '../selectors/products.selectors';
import { Product } from '../models/Product';

export class ProductsPage {
  constructor(private page: Page) {}

  async verifyProductsPageLoaded(): Promise<void> {
    await expect(this.page.locator(ProductsSelectors.page.allProductsHeading)).toBeVisible();
  }

  async filterByCategory(category: string, subCategory: string): Promise<void> {
    const categorySelector = ProductsSelectors.categories.categoryLink(category);
    await this.page.click(categorySelector);
    await this.page.waitForTimeout(500);

    const subCategorySelector = `#${category} a:has-text("${subCategory}")`;
    await this.page.click(subCategorySelector);
    await this.page.waitForURL(`**/category_products/**`);
  }

  async getFirstProductDetails(): Promise<Product> {
    const firstProduct = this.page.locator(ProductsSelectors.productList.productItem).first();
    await expect(firstProduct).toBeVisible();

    const name = await firstProduct.locator(ProductsSelectors.productList.productName).textContent();
    const price = await firstProduct
      .locator(ProductsSelectors.productList.productPrice)
      .textContent();

    return {
      name: name?.trim() || '',
      price: price?.trim() || '',
    };
  }

  async verifyFilteredResults(expectedCategory: string): Promise<void> {
    const heading = this.page.locator('h2.title.text-center').first();
    await expect(
      this.page.locator('h2.title.text-center').first()
      ).toContainText(/dress/i);
      

    const products = this.page.locator(ProductsSelectors.productList.productItem);
    await expect(products.first()).toBeVisible();
  }

  async addFirstProductToCart(): Promise<Product> {
    const product = await this.getFirstProductDetails();
    const firstProduct = this.page.locator(ProductsSelectors.productList.productItem).first();

    await firstProduct.hover();
    await firstProduct.locator(ProductsSelectors.productList.addToCartOverlay).click();

    await this.handleAddToCartModal('continue');

    return product;
  }

  async viewProductDetails(productIndex: number = 1): Promise<void> {
    const product = this.page.locator(ProductsSelectors.productList.productItem).nth(productIndex);
    await product.locator(ProductsSelectors.productList.viewProductButton).click();
    await this.page.waitForURL('**/product_details/**');
  }

  async getProductDetailsFromDetailPage(): Promise<Product> {
    await expect(this.page.locator(ProductsSelectors.productDetail.name)).toBeVisible();

    const name = await this.page.locator(ProductsSelectors.productDetail.name).textContent();
    const price = await this.page.locator(ProductsSelectors.productDetail.price).textContent();

    return {
      name: name?.trim() || '',
      price: price?.trim() || '',
    };
  }

  async addToCartFromDetailPage(): Promise<void> {
    await this.page.click(ProductsSelectors.productDetail.addToCartButton);
    await this.handleAddToCartModal('view');
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
  }

  private async handleAddToCartModal(action: 'continue' | 'view'): Promise<void> {
    await expect(this.page.locator(ProductsSelectors.modal.container)).toBeVisible();

    if (action === 'continue') {
      await this.page.click(ProductsSelectors.modal.continueShoppingButton);
      await expect(this.page.locator(ProductsSelectors.modal.container)).not.toBeVisible();
    } else {
      await this.page.click(ProductsSelectors.modal.viewCartButton);
      await this.page.waitForURL('**/view_cart');
    }
  }
}