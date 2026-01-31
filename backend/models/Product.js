const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productCode: { type: String, required: true, unique: true }, // SP001
  productName: { type: String, required: true },              // Lúa ST25
  batchCode: { type: String, required: true },                // 123456
  manufacturer: { type: String },                             // HTX Nông nghiệp
  createdAt: { type: Date, default: Date.now },
  blockchainHash: { type: String }
});

module.exports = mongoose.model("Product", ProductSchema);
