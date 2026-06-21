const db = require('../config/db');

// ===============================
// LẤY TẤT CẢ PHÒNG
// ===============================
exports.getAllRooms = (req, res) => {
    const sql = "SELECT * FROM rooms";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Lỗi lấy danh sách phòng:", err);
            return res.status(500).json({ message: "Lỗi server" });
        }

        res.json(result);
    });
};

// ===============================
// LẤY PHÒNG THEO ID
// ===============================
exports.getRoomById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM rooms WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Lỗi lấy phòng:", err);
            return res.status(500).json({ message: "Lỗi server" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy phòng" });
        }

        res.json(result[0]);
    });
};

// ===============================
// THÊM PHÒNG
// ===============================
exports.createRoom = (req, res) => {

    const { name, price_day, description, capacity } = req.body;
    const image = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO rooms (name, description, price_day, capacity, status, image)
        VALUES (?, ?, ?, ?, 'active', ?)
    `;

    db.query(sql, [name, description, price_day, capacity, image], (err, result) => {

        if (err) {
            console.error("Lỗi thêm phòng:", err);
            return res.status(500).json({ message: "Thêm phòng thất bại" });
        }

        res.json({
            message: "Thêm phòng thành công",
            id: result.insertId
        });

    });

};

// ===============================
// CẬP NHẬT PHÒNG
// ===============================
exports.updateRoom = (req, res) => {
    const { id } = req.params;
    const { name, description, price_day, capacity } = req.body;

    const sql = `
        UPDATE rooms
        SET name=?, description=?, price_day=?, capacity=?
        WHERE id=?
    `;

    db.query(sql, [name, description, price_day, capacity, id], (err) => {
        if (err) {
            console.error("Lỗi cập nhật phòng:", err);
            return res.status(500).json({ message: "Cập nhật thất bại" });
        }

        res.json({ message: "Cập nhật phòng thành công" });
    });
};

// ===============================
// XÓA PHÒNG
// ===============================
exports.deleteRoom = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM rooms WHERE id=?";

    db.query(sql, [id], (err) => {
        if (err) {
            console.error("Lỗi xóa phòng:", err);
            return res.status(500).json({ message: "Xóa thất bại" });
        }

        res.json({ message: "Xóa phòng thành công" });
    });
};
// Thêm ảnh phòng
exports.updateRoomImage = (req, res) => {

  const { id } = req.params;
  const image = req.file ? req.file.filename : null;

  if (!image) {
    return res.status(400).json({ message: "Chưa upload ảnh" });
  }

  const sql = "UPDATE rooms SET image = ? WHERE id = ?";

  db.query(sql, [image, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Lỗi cập nhật ảnh" });
    }

    res.json({ message: "Cập nhật ảnh phòng thành công" });
  });

};
