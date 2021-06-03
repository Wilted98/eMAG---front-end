import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../../CRUD/functions";
import { updateQuantity } from "../../CRUD/functions";
import { CLEAR_CART } from "../../redux/shopping/shopping-types";
import { COUPON_APPLIED } from "../../redux/coupon/coupon-types";
import { Link } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const cart = useSelector((state) => state.cart);
  const coupon = useSelector((state) => state.coupon);

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  let total = cart
    .reduce(
      (acc, value) =>
        acc + JSON.parse(value.qty) * (JSON.parse(value.price) + 0.99),
      0
    )
    .toFixed(0);
  // let discount = (coupon.value * parseFloat(total)) / 100;
  let priceAfterDiscount =
    parseFloat(total) - (coupon.value * parseFloat(total)) / 100 + 21;
  let ids = [];
  cart.map((item) => ids.push({ id: item._id, qty: item.qty }));
  useEffect(() => {
    createPaymentIntent(
      token,
      coupon.state === true ? priceAfterDiscount : parseFloat(total) + 21
    )
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(ids);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: e.target.name.value,
      },
    });
    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      updateQuantity(ids);
      dispatch({
        type: CLEAR_CART,
        payload: [],
      });
      dispatch({
        type: COUPON_APPLIED,
        payload: { state: false, value: 0 },
      });
    }
  };
  const handleChange = async (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <div>
      <span
        className={
          succeeded
            ? "result-message flex justify-center my-1"
            : "result-message hidden"
        }
      >
        <AiOutlineCheckCircle className="text-harlequin text-2xl mr-1" /> Plata
        realizata cu succes. Apasa{" "}
        <Link to="/" className="mx-1">
          aici
        </Link>{" "}
        pentru a fi redirectionat!
      </span>
      {!succeeded && (
        <span className="text-black text-base tracking-tighter font-semibold flex justify-center">
          Total de plata:{" "}
          <span className="text-harlequin ml-2 mr-1">
            <u>
              {coupon.state ? priceAfterDiscount : parseFloat(total) + 20.99}
            </u>
          </span>
          Lei
        </span>
      )}
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {!succeeded && (
          <div className="text-base font-bold text-gray-500 tracking-tighter">
            Use: 4242 4242 4242 4242
          </div>
        )}
        {error && (
          <div className="text-center" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default StripeCheckout;
