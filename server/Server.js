const cors = require("cors");
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//paypal integration client and secret code

const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

const base = "https://api-m.sandbox.paypal.com";

async function generateAccessToken() {
  const response = await axios({
    url: base + "/v1/oauth2/token",
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: PAYPAL_CLIENT,
      password: PAYPAL_SECRET,
    },
  });
  return response.data.access_token;
}
const PORT = 5000;

//Create Order API

app.post("/create-order", async (req, res) => {
  try {
    const accessToken = await generateAccessToken();

    const response = await axios({
      url: base + "/v2/checkout/orders",
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "10.00",
            },
          },
        ],
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//CAPTURE PAYMENT API
app.post("/capture-order", async (req, res) => {
  const { orderID } = req.body;
  try {
    const response = await axios({
      url: `${base}/v2/checkout/orders/${orderID}/capture`,
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
