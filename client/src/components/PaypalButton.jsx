import React from "react";
import axios from "axios";
import { PayPalButtons } from "@paypal/react-paypal-js";
import "./payment.css";

export default function PaypalButton() {
  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Premium Subscription</h2>
        <p className="price">$10 / Month</p>

        <p className="desc">
          Unlock AI Career Coach premium features including unlimited chat
          support and career guidance.
        </p>

        <div className="paypal-button">
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "gold",
              shape: "pill",
              label: "paypal",
            }}
            createOrder={async () => {
              const res = await axios.post(
                "http://localhost:5000/create-order",
              );
              return res.data.id;
            }}
            onApprove={async (data) => {
              await axios.post("http://localhost:5000/capture-order", {
                orderID: data.orderID,
              });
              alert("Payment Successful 🎉");
            }}
            onError={(err) => {
              console.log(err);
            }}
          />
        </div>
      </div>
    </div>
  );
}
