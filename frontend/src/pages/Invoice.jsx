import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import "./invoice.css";

function Invoice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const sendOtp = async () => {
    if (!phone) {
      alert("Enter phone number");
      return;
    }

    try {
      setSendingOtp(true);

      const res = await axios.post(
        "https://e-commers-b1u3.onrender.com/api/send-otp",
        {
          phone,
        },
      );

      alert(res.data.message);

      setOtpSent(true);
    } catch (err) {
      console.log(err.response?.data || err);

      alert("Failed to send OTP");
    }

    setSendingOtp(false);
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setVerifyingOtp(true);

      const res = await axios.post(
        "https://e-commers-b1u3.onrender.com/api/verify-otp",
        {
          phone,
          otp,
        },
      );

      alert(res.data.message);

      setVerified(true);
    } catch (err) {
      console.log(err.response?.data || err);

      alert("Invalid OTP");
    }

    setVerifyingOtp(false);
  };

  const checkout = async () => {
    if (!email || !phone) {
      alert("Please enter Email and Phone Number");
      return;
    }
    if (!verified) {
      alert("Please verify your phone first.");
      return;
    }

    try {
      const response = await axios.post(
        "https://e-commers-b1u3.onrender.com/api/send-order-email",
        {
          email,
          phone,
          cart,
          total,
          paymentMethod,
        },
      );

      console.log(response.data);

      localStorage.removeItem("cart");

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Order Placed Successfully");

      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err);

      alert("Checkout Failed");
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

          <h3 style={{ marginTop: 20 }}>Phone Number</h3>

          <input
            type="text"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={sendOtp} disabled={sendingOtp}>
            {sendingOtp ? "Sending..." : "Send OTP"}
          </button>
          {otpSent && (
            <>
              <h3 style={{ marginTop: 20 }}>Enter OTP</h3>

              <input
                type="text"
                placeholder="6 Digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button onClick={verifyOtp} disabled={verifyingOtp || verified}>
                {verified
                  ? "Verified ✓"
                  : verifyingOtp
                    ? "Verifying..."
                    : "Verify OTP"}
              </button>
            </>
          )}

          {verified && (
            <p
              style={{
                color: "green",
                marginTop: "15px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              ✅ Phone Number Verified
            </p>
          )}
        </div>

        <button
          className="checkout-btn"
          onClick={checkout}
          disabled={!verified}
          style={{
            opacity: verified ? 1 : 0.6,
            cursor: verified ? "pointer" : "not-allowed",
          }}
        >
          Checkout
        </button>
      </div>

      <Footer />
    </>
  );
}

export default Invoice;
