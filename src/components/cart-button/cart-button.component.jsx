import React from "react";
import "./cart-button.styles.scss";

// * Exporting a stateless functional component

const CartButton = ({ children }) => (
  <button className="cart-custom-button">{children}</button>
);

export default CartButton;
