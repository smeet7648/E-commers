import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./invoice.css";
import Footer from "../components/Footer";
function Invoice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const [email, setEmail] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = async () => {
    try {
      const response = await axios.post(
        "https://e-commers-b1u3.onrender.com/api/send-order-email",
        {
          email,
          cart,
          total,
          paymentMethod,
        },
      );

      console.log(response.data);

      localStorage.removeItem("cart");

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Order Placed Successfully");
    } catch (err) {
      console.log(err);

      alert("Email Sending Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="invoice-page">
        <h1>Invoice</h1>

        {cart.map((item) => (
          <div key={item.id} className="invoice-item">
            <img src={item.image} alt={item.name} className="invoice-image" />

            <div className="invoice-details">
              <h3>{item.name}</h3>

              <p>Price: ₹{item.price.toLocaleString()}</p>

              <p>Quantity: {item.quantity}</p>

              <p className="subtotal">
                Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}

        <h2 id="total">Total ₹{total.toLocaleString()}</h2>

        <div className="payment-methods">
          <h3>Payment Method</h3>

          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash On Delivery
          </label>

          <label>
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              value="CARD"
              checked={paymentMethod === "CARD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Card
          </label>
        </div>

        <div className="email-box">
          <h3>Email</h3>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="checkout-btn" onClick={checkout}>
          Checkout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Invoice;
