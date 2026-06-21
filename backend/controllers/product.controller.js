const db = require("../config/db");

// =============================
// GET ALL PRODUCTS
// =============================
exports.getProducts = (req, res) => {

  const search = req.query.search || "";

  let sql = "SELECT * FROM products";
  let params = [];

  if (search) {
    sql += " WHERE name LIKE ?";
    params.push(`%${search}%`);
  }

  db.query(sql, params, (err, result) => {

    if (err) {
      console.log("GET PRODUCTS ERROR:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }

    res.json(result);

  });
};


// =============================
// CREATE PRODUCT
// =============================
exports.createProduct = (req, res) => {

  const { name, price, image_url, category } = req.body;

  const sql =
    "INSERT INTO products (name,price,image_url,category) VALUES (?,?,?,?)";

  db.query(sql, [name, price, image_url, category], (err, result) => {

    if (err) {
      console.log("CREATE PRODUCT ERROR:", err);
      return res.status(500).json({ error: "Thêm thất bại" });
    }

    res.json({
      message: "Thêm thành công",
      id: result.insertId
    });

  });

};


// =============================
// DELETE PRODUCT
// =============================
exports.deleteProduct = (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM products WHERE id=?";

  db.query(sql, [id], (err) => {

    if (err) {
      console.log("DELETE PRODUCT ERROR:", err);
      return res.status(500).json({ error: "Xóa thất bại" });
    }

    res.json({ message: "Xóa thành công" });

  });

};


// =============================
// UPDATE PRODUCT
// =============================
exports.updateProduct = (req, res) => {

  const id = req.params.id;
  const { name, price, image_url, category, status } = req.body;

  const sql =
    "UPDATE products SET name=?,price=?,image_url=?,category=?,status=? WHERE id=?";

  db.query(sql, [name, price, image_url, category, status, id], (err) => {

    if (err) {
      console.log("UPDATE PRODUCT ERROR:", err);
      return res.status(500).json({ error: "Cập nhật thất bại" });
    }

    res.json({ message: "Cập nhật thành công" });

  });

};