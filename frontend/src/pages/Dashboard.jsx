import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import Footer from "../components/Footer";

function Dashboard() {
  const images = [
    "https://static.vecteezy.com/system/resources/previews/006/560/561/non_2x/4-april-sale-poster-or-banner-with-4-over-on-product-podium-scene-april-4-sales-banner-template-design-for-social-media-and-website-special-offer-sale-50-off-campaign-or-promotion-free-vector.jpg",
    "https://cdn.dribbble.com/userupload/4812817/file/original-ffd8cfe841071274126c5b9fa5c929cc.png?resize=1152x700",
    "https://static.vecteezy.com/system/resources/previews/000/178/364/large_2x/super-sale-offer-and-discount-banner-template-for-marketing-and-vector.jpg",
    "https://st-gdx.dancf.com/gaodingx/0/uxms/design/20200918-115810-c236.png",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-commers-b1u3.onrender.com/api")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const categories = [
    "All",
    "Electronics",
    "Furniture",
    "Clothing",
    "Shoes",
    "Bags",
    "Watches",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState(50000);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, search, priceRange]);

  const productsPerPage = 10;

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPrice = product.price <= priceRange;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  const lastProductIndex = currentPage * productsPerPage;

  const firstProductIndex = lastProductIndex - productsPerPage;

  const currentProducts = filteredProducts.slice(
    firstProductIndex,
    lastProductIndex,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find((p) => p.id === item._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: item._id,
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
    <div>
      <Navbar search={search} setSearch={setSearch} products={products} />

      {/* Slider */}
      <div className="slider">
        <img src={images[current]} alt="banner" className="images" />

        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${current === index ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="products-section">
        <h2>Featured Products</h2>

        <div className="categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="price-range">
          <h4>Max Price: ₹{priceRange.toLocaleString()}</h4>

          <input
            type="range"
            min="300"
            max="50000"
            step="500"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
          />
        </div>

        <div className="product-container">
          {currentProducts.map((item) => {
            const averageRating =
              item.reviews?.length > 0
                ? (
                    item.reviews.reduce(
                      (sum, review) => sum + review.rating,
                      0,
                    ) / item.reviews.length
                  ).toFixed(1)
                : 0;

            return (
              <div className="product-card" key={item._id}>
                <img src={item.image} alt={item.name} />

                <div className="product-info">
                  <h3>{item.name}</h3>

                  <div className="product-rating">
                    ⭐ {averageRating}
                    <span>({item.reviews?.length || 0})</span>
                  </div>

                  <p className="price">₹{item.price?.toLocaleString()}</p>

                  <button onClick={() => addToCart(item)}>Add To Cart</button>

                  <Link to={`/products/${item._id}`}>View Details</Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Dashboard;
