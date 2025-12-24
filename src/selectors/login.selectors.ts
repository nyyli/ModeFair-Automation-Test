export const LoginSelectors = {
    login: {
      heading: 'h2:has-text("Login to your account")',
      emailInput: '[data-qa="login-email"]',
      passwordInput: '[data-qa="login-password"]',
      loginButton: '[data-qa="login-button"]',
    },
    signup: {
      heading: 'h2:has-text("New User Signup!")',
      nameInput: '[data-qa="signup-name"]',
      emailInput: '[data-qa="signup-email"]',
      signupButton: '[data-qa="signup-button"]',
    },
  };