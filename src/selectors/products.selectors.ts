export const ProductsSelectors = {
    page: {
      heading: '.title.text-center',
      allProductsHeading: 'h2.title.text-center:has-text("All Products")',
    },
    categories: {
      panel: '.left-sidebar .panel-group',
      categoryLink: (category: string) => `a[href="#${category}"]`,
      subCategoryLink: (category: string) => `#${category} a`,
    },
    productList: {
      container: '.features_items',
      productItem: '.product-image-wrapper',
      productName: '.productinfo p',
      productPrice: '.productinfo h2',
      viewProductButton: 'a:has-text("View Product")',
      addToCartButton: '.productinfo a.btn.add-to-cart',
      addToCartOverlay: '.product-overlay a.btn.add-to-cart',
    },
    modal: {
      container: '.modal-content',
      continueShoppingButton: 'button:has-text("Continue Shopping")',
      viewCartButton: 'a:has-text("View Cart")',
    },
    productDetail: {
      name: '.product-information h2',
      category: '.product-information p:has-text("Category:")',
      price: '.product-information span span',
      availability: '.product-information p:has-text("Availability:")',
      condition: '.product-information p:has-text("Condition:")',
      brand: '.product-information p:has-text("Brand:")',
      addToCartButton: 'button.cart',
      quantity: '#quantity',
    },
  };