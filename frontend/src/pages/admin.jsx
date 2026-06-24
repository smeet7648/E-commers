import React, { useState } from "react";
import axios from "axios";
import "./admin.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Admin() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const saveProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/save", {
        name,
        category,
        image,
        price,
        description,
      });

      if (!name || !category || !image || !price || !description) {
        alert("Please fill all fields");
        return;
      }
      alert("Product Created");

      setName("");
      setCategory("");
      setImage("");
      setPrice("");
      setDescription("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="admin-container">
        <form className="admin-form" onSubmit={saveProduct}>
          <h2>Create Product</h2>

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Create Product</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
