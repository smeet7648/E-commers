import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ search, setSearch, products = [] }) {
  const navigate = useNavigate();

  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      const items = JSON.parse(localStorage.getItem("cart")) || [];

      setCart(items);
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);

    setCart(updated);

    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const suggestions = products.filter(
    (product) =>
      search && product.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <nav className="navbar">
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          ☰
        </div>
        <div className="logo">
          <Link to="/dashboard">ShopEase</Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/dashboard">Home</Link>
          </li>

          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>

        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button>🔍</button>
          </div>

          {search && suggestions.length > 0 && (
            <div className="search-dropdown">
              {suggestions.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                  className="search-item"
                  onClick={() => {
                    setSearch("");
                    navigate(`/products/${product._id}`);
                  }}
                >
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`mobile-sidebar ${menuOpen ? "show-sidebar" : ""}`}>
          <div className="sidebar-header">
            <h2>Menu</h2>

            <button onClick={() => setMenuOpen(false)}>✕</button>
          </div>

          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
            Wishlist
          </Link>

          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            Profile
          </Link>

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        </div>

        <div className="nav-actions">
          <button className="cart-btn" onClick={() => setCartOpen(true)}>
            🛒 Cart ({totalItems})
          </button>

          <Link id="fix1" to="/">Login</Link>
        </div>
      </nav>

      <div className={`cart-sidebar ${cartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>

          <button onClick={() => setCartOpen(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <h4>{item.name}</h4>

                <p>₹{item.price.toLocaleString()}</p>

                <p>Quantity: {item.quantity}</p>

                <p>
                  Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
                </p>

                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            ))}

            <div className="cart-footer">
              <h3>Total ₹{total.toLocaleString()}</h3>

              <button
                onClick={() => navigate("https://e-commers-b1u3.onrender.com/api/invoice/:id")}
                className="buy-btn"
              >
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
