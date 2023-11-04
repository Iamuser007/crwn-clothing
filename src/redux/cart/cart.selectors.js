import { createSelector } from "reselect";

// Input selector (refer to notes)
const selectCart = (state) => state.cart; // gets the entire state and returns just the cart from the state

export const selectCartItems = createSelector(
  // first argument is a selector
  [selectCart],
  // the second parameter is gonna be a function that will return the value we want out of the selector
  (cart) => cart.cartItems
); // 'selectCartItems' is a property on the cart

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// this code below returns the total quantity of all the cart items
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
