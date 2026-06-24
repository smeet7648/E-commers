import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./wishlist.css";
import Footer from "../components/Footer";

function Wishlist() {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || [],
  );

  const removeWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);

    setWishlist(updated);

    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((p) => p.id === item.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Added to Cart");
  };

  return (
    <>
      <Navbar />

      <div className="wishlist-page">
        <h1>❤️ My Wishlist</h1>

        <div className="wishlist-container">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="wishlist-content">
                <h3>{item.name}</h3>

                <p className="wishlist-price">₹{item.price}</p>

                <div className="wishlist-btns">
                  <button
                    onClick={() => addToCart(item)}
                    className="move-cart-btn"
                  >
                    Add To Cart
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => removeWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;
