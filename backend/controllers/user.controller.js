const db = require("../config/db");

exports.getUsers = (req, res) => {
  const sql = `
    SELECT id, name, email
    FROM users
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Lỗi lấy danh sách users:", err);
      return res.status(500).json({ message: "Lỗi server" });
    }

    res.json(result);
  });
};