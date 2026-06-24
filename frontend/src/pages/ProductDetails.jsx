import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./ProductDetails.css";
import Footer from "../components/Footer";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>
      </>
    );
  }

  const name1 = localStorage.getItem("name1");

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((item) => item.id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Added To Cart");
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find((item) => item.id === product._id);

    if (exists) {
      alert("Product already in wishlist");
      return;
    }

    wishlist.push({
      id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert("Added to Wishlist ❤️");
  };

  const buyNow = () => {
    const buyProduct = [
      {
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(buyProduct));

    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/invoice");
  };

  const submitReview = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/${id}/review`, {
        name: "User",
        rating,
        comment,
      });

      setProduct(res.data);

      setComment("");
      setRating(5);

      alert("Review Added Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const averageRating = product.reviews?.length
    ? (
        product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length
      ).toFixed(1)
    : 0;

  return (
    <>
      <Navbar />

      <div className="product-details">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-content">
          <h1>{product.name}</h1>

          <p className="category">{product.category}</p>

          <div className="rating-box">
            ⭐ {averageRating}
            <span>
              ({product.reviews?.length || 0}
              reviews)
            </span>
          </div>

          <p className="price">₹{product.price?.toLocaleString()}</p>

          <p className="description">{product.description}</p>

          <p className="stock">✓ In Stock</p>

          <div className="btn-group">
            <button onClick={addToCart} className="add-cart">
              Add to Cart
            </button>

            <button onClick={addToWishlist} className="wishlist-btn">
              Wishlist
            </button>

            <button className="buy-now" onClick={buyNow}>Buy Now</button>
          </div>

          <div className="info-box">
            <p>
              <strong>Free Delivery</strong>
            </p>

            <p>Cash on Delivery Available</p>

            <p>7 Days Return Policy</p>

            <p>Secure Payment</p>
          </div>
        </div>
      </div>
      <div className="reviews-section">
        <h2>Customer Reviews</h2>

        <div className="review-form">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="5">⭐⭐⭐⭐⭐</option>

            <option value="4">⭐⭐⭐⭐</option>

            <option value="3">⭐⭐⭐</option>

            <option value="2">⭐⭐</option>

            <option value="1">⭐</option>
          </select>

          <textarea
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={submitReview} className="review-btn">
            Submit Review
          </button>
        </div>

        {product.reviews?.map((review, index) => (
          <div key={index} className="review-card">
            <h4>{localStorage.getItem("name1")}</h4>

            <p className="stars">{"⭐".repeat(review.rating)}</p>

            <p>{review.comment}</p>
          </div>
        ))}
      </div>
      <Footer/>
    </>
  );
}

export default ProductDetails;
