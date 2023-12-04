import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishablekey =
    "pk_test_51OJiJDIRZzYzB0Dfc1Pw3A4fMLSqAn3MZUlGJ2Xksk8dZIcf8cjw3HSDnIvyamBy27Dkr8cEMtMpJAG8g46N90pw00qn6BroH3";

  const onToken = (token) => {
    console.log(token);
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN clothing"
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/10SM.svg"
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishablekey}
    />
  );
};

export default StripeCheckoutButton;
