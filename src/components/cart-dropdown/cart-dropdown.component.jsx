import React from "react";
import "./cart-dropdown.styles.scss";
import CartButton from "../cart-button/cart-button.component";
import CartItem from "../cart-item/cart-item.component";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

const CartDropdown = ({ cartItems, dispatch }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your Cart Is Empty</span>
        )}
      </div>
      <CartButton getDispatch={dispatch}>GO TO CHECKOUT</CartButton>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  // this 'selectCartItems' ensures that the cart dropdown is not being re-rendered whenever there is an change to the state that is unrelated to the cart dropdown. So when the user signs out or in -- it doesn't change the cart item dropdown or the count which improves performance
  cartItems: selectCartItems,
});

// * A more efficient way to run the code i commented above

export default connect(mapStateToProps)(CartDropdown);

// NOTE //todo If the dispatch is not specified explicitly 'mapStateToDispatch' like we did in the other codes, then is added to the component and that is why we could access it here from the parameter
