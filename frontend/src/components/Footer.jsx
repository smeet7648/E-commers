import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>ShopEase</h2>

          <p>
            Your one-stop destination for
            electronics, fashion, furniture,
            and much more at the best prices.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>

            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>

            <li>
              <Link to="/order-history">
                Order History
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Shop</h3>

          <ul>
            <li>
              <Link to="/dashboard">
                Electronics
              </Link>
            </li>

            <li>
              <Link to="/dashboard">
                Furniture
              </Link>
            </li>

            <li>
              <Link to="/dashboard">
                Clothing
              </Link>
            </li>

            <li>
              <Link to="/dashboard">
                Watches
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>

          <p>📍 Ahmedabad, India</p>

          <p>📞 +91 9876543210</p>

          <p>✉ support@shopease.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 ShopEase. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;