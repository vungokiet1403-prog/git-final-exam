const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Thêm sản phẩm
router.post("/", async (req, res) => {
  try {
    const product = new Product({
      productCode: req.body.productCode,
      productName: req.body.productName,
      batchCode: req.body.batchCode,
      manufacturer: req.body.manufacturer,
      blockchainHash: req.body.blockchainHash
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy danh sách
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

module.exports = router;
