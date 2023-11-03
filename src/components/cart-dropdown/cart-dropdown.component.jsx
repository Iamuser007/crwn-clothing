import React from "react";
import "./cart-dropdown.styles.scss";
import CartButton from "../cart-button/cart-button.component";
import CartItem from "../cart-item/cart-item.component";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";

const CartDropdown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
    </div>
    <CartButton>GO TO CHECKOUT</CartButton>
  </div>
);

const mapStateToProps = (state) => ({
  // this 'selectCartItems' ensures that the cart dropdown is not being re-rendered whenever there is an change to the state that is unrelated to the cart dropdown. So when the user signs out or in -- it doesn't change the cart item dropdown or the count which improves performance
  cartItems: selectCartItems(state),
});

export default connect(mapStateToProps)(CartDropdown);
