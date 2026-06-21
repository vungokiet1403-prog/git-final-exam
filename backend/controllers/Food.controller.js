const db = require("../config/db");

// lấy danh sách đồ ăn
exports.getFoods = (req, res) => {
  db.query("SELECT * FROM foods", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// thêm đồ ăn
exports.addFood = (req, res) => {
  const { name, price, image } = req.body;

  db.query(
    "INSERT INTO foods (name, price, image) VALUES (?, ?, ?)",
    [name, price, image],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Thêm đồ ăn thành công" });
    }
  );
};

// cập nhật đồ ăn
exports.updateFood = (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  db.query(
    "UPDATE foods SET name=?, price=?, image=? WHERE id=?",
    [name, price, image, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Cập nhật thành công" });
    }
  );
};

// xóa đồ ăn
exports.deleteFood = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM foods WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Xóa thành công" });
  });
};
// tạo đơn đồ ăn 

exports.createFoodOrder = (req, res) => {

  const { room_name, order_date, order_time, items, total_price } = req.body;

  const sqlOrder = `
    INSERT INTO food_orders (room_name, order_date, order_time, total_price)
    VALUES (?,?,?,?)
  `;

  db.query(sqlOrder, [room_name, order_date, order_time, total_price], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Lỗi tạo order" });
    }

    const orderId = result.insertId;

    if (!items || items.length === 0) {
      return res.json({ message: "Tạo order thành công nhưng chưa có món" });
    }

    let count = 0;

    items.forEach((item) => {

      const sqlItem = `
        INSERT INTO food_order_items (order_id, food_id, quantity, price)
        VALUES (?,?,?,?)
      `;

      db.query(
        sqlItem,
        [orderId, item.id, item.quantity, item.price],
        (err2) => {

          if (err2) {
            console.log(err2);
            return res.status(500).json({ error: "Lỗi thêm món ăn" });
          }

          count++;

          if (count === items.length) {
            res.json({ message: "Đặt món thành công", order_id: orderId });
          }

        }
      );

    });

  });

};

// admin kiểm tra đơn đồ ăn 
exports.getFoodOrders = (req, res) => {

  const sql = `
  SELECT 
    fo.id AS order_id,
    fo.room_name,
    fo.order_time,
    fo.status,

    foi.food_id,
    foi.quantity,

    p.name AS food_name,
    p.price,
    p.image_url,
    p.category

  FROM food_orders fo

  LEFT JOIN food_order_items foi 
  ON fo.id = foi.order_id

  LEFT JOIN products p 
  ON foi.food_id = p.id

  ORDER BY fo.created_at DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);

  });

};
// Hàm khi đã chuẩn bị món xong 
exports.updateFoodOrderStatus = (req, res) => {

  const id = req.params.id;

  const sql = `
  UPDATE food_orders
  SET status = 'done'
  WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({ message: "Đã cập nhật trạng thái" });

  });

};