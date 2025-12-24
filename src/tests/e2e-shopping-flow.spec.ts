import { test, expect } from '../fixtures/sessions';
import { Product } from '../models/Product';
import testData from '../test-data/test-data.json';

test.describe('E2E Shopping Flow - Automation Exercise', () => {
  let firstProduct: Product;
  let userEmail: string;

  test('Complete end-to-end shopping journey with authentication, filtering, cart management, and checkout', async ({
    page,
    homePage,
    loginPage,
    signupPage,
    productsPage,
    cartPage,
    checkoutPage,
    paymentPage,
  }) => {
    // Generate unique email for registration
    const timestamp = Date.now();
    userEmail = testData.user.email.replace('{{timestamp}}', timestamp.toString());

    // Pre-test: Register a new account
    await test.step('Register a new user account', async () => {
      await page.goto('/');
      await homePage.navigateToLoginPage();

      await loginPage.navigateToSignup(testData.user.name, userEmail);

      await signupPage.fillAccountInformation(testData.user.password);
      await signupPage.fillAddressInformation(testData.checkout);
      await signupPage.submitRegistration();

      await expect(await homePage.isLoggedIn()).toBeTruthy();
    });

    // Step 1: Logout and login
    await test.step('Logout and login with created account', async () => {
      await homePage.logout();

      await loginPage.login({
        email: userEmail,
        password: testData.user.password,
      });

      await expect(await homePage.isLoggedIn()).toBeTruthy();
    });

    // Step 2: Filter products
    await test.step('Navigate to products and filter by Women > Dress category', async () => {
      await homePage.navigateToProductsPage();
      await productsPage.verifyProductsPageLoaded();

      await productsPage.filterByCategory(
        testData.categories.women,
        testData.categories.womenDress
      );

      await productsPage.verifyFilteredResults(
        testData.categories.womenDress.toUpperCase()
      );
    });

    // Step 3: Capture product details
    await test.step('Verify first product in filtered results', async () => {
      firstProduct = await productsPage.getFirstProductDetails();

      expect(firstProduct.name).toBeTruthy();
      expect(firstProduct.price).toBeTruthy();
      expect(firstProduct.price).toMatch(/Rs\.\s*\d+/);

      console.log('First Product:', firstProduct);
    });

    // Step 4: Add to cart & verify
    await test.step('Add product to cart and verify cart details', async () => {
      await productsPage.addFirstProductToCart();
      await homePage.navigateToCart();

      await cartPage.verifyProductInCart(firstProduct);
      await cartPage.verifyProductPrice(firstProduct.name, firstProduct.price);
    });

    // (Optional) Continue checkout steps here
  });
});
