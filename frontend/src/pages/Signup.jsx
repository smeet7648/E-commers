import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signup = async () => {
    if(!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/signup",
        { name, email, password },
        { withCredentials: true } // important
      );

      alert("Signup successful");
      localStorage.setItem("name1", name);
      navigate("/");

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={signup}>Create Account</button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}