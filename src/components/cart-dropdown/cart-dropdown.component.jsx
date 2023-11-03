import React from "react";
import "./cart-dropdown.styles.scss";
import CartButton from "../cart-button/cart-button.component";

const CartDropdown = () => (
  <div className="cart-dropdown">
    <div className="cart-items"></div>
    <CartButton>GO TO CHECKOUT</CartButton>
  </div>
);

export default CartDropdown;
