const express = require("express");
const router = express.Router();
const Product = require("../models/Products");

router.post("/save", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/:id/review", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    product.reviews.push({
      name,
      rating,
      comment,
    });

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
