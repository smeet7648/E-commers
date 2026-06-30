const express = require("express");
const router = express.Router();

const SibApiV3Sdk = require("sib-api-v3-sdk");

router.post("/send-order-email", async (req, res) => {
  try {
    const { email, phone, cart, total, paymentMethod } = req.body;

    console.log("REQUEST RECEIVED:");

    console.log(req.body);

    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications["api-key"];

    apiKey.apiKey = process.env.BREVO_API_KEY;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const products = cart
      .map(
        (item) => `
          <div style="margin-bottom:15px;">
            <h3>${item.name}</h3>

            <img
              src="${item.image}"
              width="120"
            />

            <p>
              Quantity:
              ${item.quantity}
            </p>

            <p>
              Price:
              ₹${item.price}
            </p>
          </div>
        `,
      )
      .join("");

    await apiInstance.sendTransacEmail({
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "ShopEase",
      },

      to: [
        {
          email,
        },
      ],

      subject: "Order Confirmation",

      htmlContent: `
<h1 style="color:#2563eb;">
Thank You For Your Order
</h1>

<p>
Your order has been placed successfully.
</p>

<hr>

<h2>Customer Details</h2>

<p><b>Email:</b> ${email}</p>

<p><b>Phone:</b> ${phone}</p>

<p><b>Payment:</b> ${paymentMethod}</p>

<hr>

${products}

<hr>

<h2 style="color:green;">
Grand Total : ₹${total}
</h2>

<p>
Thank you for shopping with
<b>ShopEase ❤️</b>
</p>
`,
    });

    res.json({
      success: true,
      message: "Email Sent",
    });
  } catch (err) {
    console.log("EMAIL ERROR:");

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
