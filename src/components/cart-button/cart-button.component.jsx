import React from "react";
import "./cart-button.styles.scss";
import { useNavigate } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

// * Exporting a stateless functional component

const CartButton = ({ children, getDispatch }) => {
  const navigate = useNavigate();

  const gotoCheckout = () => {
    navigate("/checkout");
    getDispatch(toggleCartHidden());
  };
  return (
    <button className="cart-custom-button" onClick={gotoCheckout}>
      {children}
    </button>
  );
};

export default CartButton;
