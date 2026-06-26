import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./about.css";

function About() {
  return (
    <>
      <Navbar />

      <div className="about-page">

        {/* Hero */}
        <section className="about-hero">
          <h1>About ShopEase</h1>
          <p>
            Your trusted destination for quality products at affordable prices.
            We make online shopping simple, secure, and enjoyable.
          </p>
        </section>

        {/* About */}
        <section className="about-section">
          <div className="about-text">
            <h2>Who We Are</h2>

            <p>
              ShopEase is a modern e-commerce platform built to provide customers
              with a smooth and reliable shopping experience. Our platform offers
              a wide range of products including electronics, fashion, home
              essentials, accessories, and much more.
            </p>

            <p>
              We believe online shopping should be fast, secure, and accessible
              for everyone. That's why we focus on providing excellent customer
              service and quality products.
            </p>
          </div>

          <div className="about-image">
            🛍️
          </div>
        </section>

        {/* Mission */}

        <section className="mission">
          <h2>Our Mission</h2>

          <p>
            To deliver premium products with exceptional customer service while
            making online shopping simple, affordable, and trustworthy.
          </p>
        </section>

        {/* Features */}

        <section className="features">

          <h2>Why Choose ShopEase?</h2>

          <div className="feature-grid">

            <div className="feature-card">
              <span>🚚</span>
              <h3>Fast Delivery</h3>
              <p>
                Quick and reliable delivery to your doorstep.
              </p>
            </div>

            <div className="feature-card">
              <span>🔒</span>
              <h3>Secure Payments</h3>
              <p>
                Safe and trusted payment methods for every order.
              </p>
            </div>

            <div className="feature-card">
              <span>⭐</span>
              <h3>Top Quality</h3>
              <p>
                Carefully selected products from trusted brands.
              </p>
            </div>

            <div className="feature-card">
              <span>💬</span>
              <h3>24/7 Support</h3>
              <p>
                Friendly customer support whenever you need help.
              </p>
            </div>

          </div>
        </section>

        {/* Team */}

        <section className="team">

          <h2>Meet Our Team</h2>

          <div className="team-grid">

            <div className="team-card">
              <img
                src="https://i.pravatar.cc/200?img=12"
                alt=""
              />
              <h3>John Smith</h3>
              <p>Founder & CEO</p>
            </div>

            <div className="team-card">
              <img
                src="https://i.pravatar.cc/200?img=32"
                alt=""
              />
              <h3>Sarah Johnson</h3>
              <p>Marketing Head</p>
            </div>

            <div className="team-card">
              <img
                src="https://i.pravatar.cc/200?img=18"
                alt=""
              />
              <h3>David Lee</h3>
              <p>Lead Developer</p>
            </div>

          </div>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default About;