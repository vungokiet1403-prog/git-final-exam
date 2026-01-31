const Product = require("../models/Product");
const QRCode = require("qrcode");

// CREATE
exports.addProduct = async (req, res) => {
  try {
    const { name, origin } = req.body;

    const product = new Product({ name, origin });
    await product.save();

    const qr = await QRCode.toDataURL(
      `http://localhost:3000/api/products/${product._id}`
    );

    product.qr = qr;
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
