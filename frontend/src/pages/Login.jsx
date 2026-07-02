import { Link } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "https://e-commers-b1u3.onrender.com/api/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("role", res.data.role);

      navigate(
        res.data.role === "admin"
          ? "/admin"
          : "/dashboard"
      );
    } catch (error) {
      console.log(error.response?.data || error);

      alert("Invalid Credentials");
    }
  };

  const googleLogin = () => {
    window.location.href =
      "https://e-commers-b1u3.onrender.com/auth/google";
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>
          Login
        </button>

        <div
          style={{
            margin: "20px 0",
            textAlign: "center",
            color: "#777",
            fontWeight: "bold",
          }}
        >
          OR
        </div>

        <button
          onClick={googleLogin}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background: "#fff",
            color: "#444",
            fontWeight: "600",
            border: "1px solid #ddd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            width="20"
            alt="google"
          />

          Continue with Google
        </button>

        <p style={{ marginTop: "20px" }}>
          Don’t have an account?{" "}
          <Link to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}