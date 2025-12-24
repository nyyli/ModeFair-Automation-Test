export const CartSelectors = {
    cartItems: {
      
      row: '#cart_info_table tbody tr',  // or 'table tbody tr'
      productName: 'h4 a',  // Based on "heading "Sleeveless Dress" [level=4]"
      productPrice: 'td:nth-child(3) p',  // "Price" column
      deleteButton: '.cart_quantity_delete',  // The delete icon
    },
    checkout: {
      proceedButton: '.check_out',  // Based on "Proceed To Checkout"
    }
  };