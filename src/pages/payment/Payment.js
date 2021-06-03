import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../../components/stripe/StripeCheckout";
import "./Payment.css";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <Elements stripe={promise}>
        <span>Payment</span>
        <StripeCheckout />
      </Elements>
    </div>
  );
};

export default Payment;
