export const HomeSelectors = {
    navigation: {
      loginLink: 'a[href="/login"]',
      productsLink: 'a[href="/products"]',
      cartLink: 'a[href="/view_cart"]',
      logoutLink: 'a[href="/logout"]',
    },
    user: {
      loggedInAs: 'a:has-text("Logged in as")',
      username: 'li > a > b',
    },
  };