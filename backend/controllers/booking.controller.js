const db = require("../config/db");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");

/* =====================================================
   CẤU HÌNH MAIL
===================================================== */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* =====================================================
   1️⃣ LẤY TẤT CẢ BOOKING
===================================================== */
/* =====================================================
   1️⃣ LẤY TẤT CẢ BOOKING (JOIN USER + ROOM)
===================================================== */
exports.getAllBookings = (req, res) => {
  const sql = `
    SELECT 
      b.id,
      c.full_name AS customer,
      c.email,
      r.name AS room,
      b.checkin_date,
      b.cccd_front,
      b.cccd_back,
      GROUP_CONCAT(ts.start_time, ' - ', ts.end_time SEPARATOR ', ') AS time_slots
    FROM bookings b
    LEFT JOIN customers c ON b.customer_id = c.id
    LEFT JOIN rooms r ON b.room_id = r.id
    LEFT JOIN booking_time_slots bts ON b.id = bts.booking_id
    LEFT JOIN time_slots ts ON bts.time_slot_id = ts.id
    GROUP BY b.id
    ORDER BY b.id DESC
    `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/* =====================================================
   2️⃣ LẤY TẤT CẢ TIME SLOT
===================================================== */
exports.getAllTimeSlots = (req, res) => {
  db.query("SELECT * FROM time_slots ORDER BY start_time", (err, result) => {
    if (err) {
      console.error("Lỗi getAllTimeSlots:", err);
      return res.status(500).json({ message: "Lỗi load time slots" });
    }
    res.json(result);
  });
};

/* =====================================================
   3️⃣ LOAD SLOT ĐÃ ĐẶT (CHỈ SLOT PAID)
===================================================== */
exports.getBookedSlots = (req, res) => {
  const { roomId } = req.params;

  const sql = `
    SELECT b.checkin_date, bts.time_slot_id
    FROM bookings b
    JOIN booking_time_slots bts ON b.id = bts.booking_id
    WHERE b.room_id = ?
    AND b.status = 'paid'
  `;

  db.query(sql, [roomId], (err, result) => {
    if (err) {
      console.error("Lỗi getBookedSlots:", err);
      return res.status(500).json({ message: "Lỗi load slot" });
    }
    res.json(result);
  });
};

/* =====================================================
   4️⃣ TẠO BOOKING (PENDING)
===================================================== */
exports.createBooking = (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  const cccdFront = req.files?.cccd_front?.[0]?.filename || null;
  const cccdBack = req.files?.cccd_back?.[0]?.filename || null;

  let {
  customer,
  email,
  phone,
  room_id,
  checkin_date,
  total_amount
} = req.body;

const customer_name = customer;
let timeSlotIds = req.body.timeSlotIds || req.body["timeSlotIds[]"];

  // 🔧 FIX TIME SLOT
 
if (!timeSlotIds) {
  return res.status(400).json({ message: "Thiếu timeSlotIds" });
}

if (!Array.isArray(timeSlotIds)) {
  timeSlotIds = [timeSlotIds];
}

timeSlotIds = timeSlotIds.map(id => Number(id));

  if (
    !customer_name ||
    !email ||
    !phone ||
    !room_id ||
    !checkin_date ||
    total_amount === undefined ||
    !Array.isArray(timeSlotIds) ||
    timeSlotIds.length === 0
  ) {
    return res.status(400).json({
      message: "Thiếu dữ liệu hoặc sai định dạng timeSlotIds",
    });
  }

  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ message: "Lỗi transaction" });
    }

    // 🔹 1. Lưu khách vào bảng customers
    const insertCustomer = `
      INSERT INTO customers (full_name, phone, email)
      VALUES (?, ?, ?)
    `;

    db.query(insertCustomer, [customer_name, phone, email], (err, customerResult) => {
      if (err) {
        return db.rollback(() =>
          res.status(500).json({ message: "Lỗi tạo customer" })
        );
      }

      const customerId = customerResult.insertId;

      // 🔎 Check slot trùng
      const checkSql = `
        SELECT b.id
        FROM bookings b
        JOIN booking_time_slots bts ON b.id = bts.booking_id
        WHERE b.room_id = ?
        AND b.checkin_date = ?
        AND bts.time_slot_id IN (?)
        AND b.status IN ('pending','paid')
      `;

      db.query(
        checkSql,
        [room_id, checkin_date, timeSlotIds],
        (err, result) => {
          if (err) {
            return db.rollback(() =>
              res.status(500).json({ message: "Lỗi kiểm tra slot" })
            );
          }

          if (result.length > 0) {
            return db.rollback(() =>
              res.status(400).json({ message: "Slot đã được đặt ❌" })
            );
          }

          // 🔹 2. Insert booking
          const insertBooking = `
            INSERT INTO bookings
            (customer_id, customer_name, email, phone, room_id, checkin_date, total_amount, status, cccd_front, cccd_back)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
            `;

            db.query(
              insertBooking,
              [
                customerId,
                customer_name,
                email,
                phone,
                room_id,
                checkin_date,
                total_amount,
                cccdFront,
                cccdBack
              ],
              (err, result) => {
              if (err) {
                return db.rollback(() =>
                  res.status(500).json({ message: "Lỗi tạo booking" })
                );
              }

              const bookingId = result.insertId;

              const values = timeSlotIds.map((slotId) => [
                bookingId,
                slotId,
              ]);

              db.query(
                "INSERT INTO booking_time_slots (booking_id, time_slot_id) VALUES ?",
                [values],
                (err) => {
                  if (err) {
                    return db.rollback(() =>
                      res.status(500).json({ message: "Lỗi thêm slot" })
                    );
                  }

                  db.commit((err) => {
                    if (err) {
                      return db.rollback(() =>
                        res.status(500).json({ message: "Lỗi commit" })
                      );
                    }

                    res.json({
                      message: "Tạo booking thành công 🎉",
                      bookingId,
                    });
                  });
                }
              );
            }
          );
        }
      );
    });
  });
};

/* =====================================================
   5️⃣ THANH TOÁN GIẢ LẬP + GỬI MAIL + QR
===================================================== */
exports.payBooking = async (req, res) => {
  
  const { booking_id } = req.body;

  if (!booking_id) {
    return res.status(400).json({ message: "Thiếu booking_id" });
  }

  try {
    // 🔎 Lấy booking + time slots
   const booking = await new Promise((resolve, reject) => {
  db.query(
    `
    SELECT 
      b.id,
      b.customer_name,
      b.email,
      b.checkin_date,
      b.total_amount,
      b.status,
      GROUP_CONCAT(
        CONCAT(TIME_FORMAT(ts.start_time, '%H:%i'), ' - ', TIME_FORMAT(ts.end_time, '%H:%i'))
        ORDER BY ts.start_time
        SEPARATOR ', '
      ) AS time_slots
    FROM bookings b
    LEFT JOIN booking_time_slots bts 
      ON b.id = bts.booking_id
    LEFT JOIN time_slots ts 
      ON ts.id = bts.time_slot_id
    WHERE b.id = ?
    GROUP BY b.id
    `,
    [booking_id],
    (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    }
  );
});

    console.log("BOOKING DATA:", booking);
    if (!booking) {
      return res.status(404).json({ message: "Booking không tồn tại" });
    }

    if (booking.status === "paid") {
      return res.status(400).json({ message: "Booking đã thanh toán rồi" });
    }

    // 🔐 Update an toàn
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE bookings SET status = 'paid' WHERE id = ? AND status != 'paid'",
        [booking_id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    // 🎟 Tạo QR
    const qrData = `CHECKIN_BOOKING_${booking_id}`;
    const qrImage = await QRCode.toDataURL(qrData);
    // đoạn tiếng việt 
    // Format ngày sang tiếng Việt
const formattedDate = new Date(booking.checkin_date)
  .toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // map 
    const latitude = 10.020096119859812
const longitude = 105.74572156463474;

const mapLink = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    // 📧 Gửi mail
    await transporter.sendMail({
      from: `"Homestay Booking" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: "Xác nhận đặt phòng & Hướng dẫn check-in 🎉",
      html: `
<div style="font-family: Arial; padding:20px">

  <h2 style="text-align:center;">Chúng mình gửi bạn thông tin nhận phòng nha</h2>

  <div style="text-align:center;">
    <img src="${qrImage}" width="200"/>
  </div>

  <p>Xin chào <b>${booking.customer_name}</b>,</p>

  <div style="background:#f9f1e7; padding:15px; border-radius:8px;">
    <p><b>Mã booking:</b> #${booking.id}</p>
    <p><b>Ngày check-in:</b> ${formattedDate}</p>
    <p><b>Khung giờ:</b> ${booking.time_slots || "Không có"}</p>
    <p><b>Số tiền:</b> ${Number(booking.total_amount).toLocaleString()} đ</p>
    <p><b>Pass cổng:</b> 9201#</p>
    <p><b>Wifi:</b> Bapcamon</p>

    <p><b>Địa chỉ:</b> Khu tái định cư đường Hoàng Quốc Việt Phường An Bình, Ninh Kiều, Cần Thơ</p>
<p>
  <a href="${mapLink}" target="_blank">
    📍 Xem chỉ đường trên Google Maps
  </a>
</p>
    </p>
  </div>

</div>
`
    });

    res.json({
      message: "Thanh toán thành công 💳",
      booking_id,
      qr: qrImage,
    });
  } catch (err) {
    console.error("Lỗi thanh toán:", err);
    res.status(500).json({ message: "Lỗi thanh toán" });
  }
};
// Lấy đồ ăn 
exports.addFoodToBooking = (req, res) => {
  const { booking_id, products } = req.body;

  // validate booking
  if (!booking_id || isNaN(booking_id)) {
    return res.status(400).json({ message: "booking_id không hợp lệ" });
  }

  // validate products
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Danh sách sản phẩm trống" });
  }

  // tính tổng tiền
  let total_food = 0;
  const values = [];

  for (const item of products) {
    const { product_id, quantity, price } = item;

    if (!product_id || !quantity || !price) {
      return res.status(400).json({ message: "Dữ liệu sản phẩm không hợp lệ" });
    }

    const q = Number(quantity);
    const p = Number(price);

    total_food += q * p;

    values.push([
      booking_id,
      product_id,
      q,
      p
    ]);
  }

  db.beginTransaction((err) => {
    if (err) {
      console.error("Transaction error:", err);
      return res.status(500).json({ message: "Không thể bắt đầu transaction" });
    }

    const insertSql = `
      INSERT INTO booking_products
      (booking_id, product_id, quantity, price)
      VALUES ?
    `;

    db.query(insertSql, [values], (err) => {
      if (err) {
        return db.rollback(() => {
          console.error("Insert error:", err);
          res.status(500).json({ message: "Lỗi thêm sản phẩm" });
        });
      }

      const updateSql = `
        UPDATE bookings
        SET total_amount = total_amount + ?
        WHERE id = ?
      `;

      db.query(updateSql, [total_food, booking_id], (err) => {
        if (err) {
          return db.rollback(() => {
            console.error("Update total error:", err);
            res.status(500).json({ message: "Lỗi cập nhật tổng tiền" });
          });
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Commit error:", err);
              res.status(500).json({ message: "Lỗi commit transaction" });
            });
          }

          res.json({
            success: true,
            message: "Thêm đồ ăn thành công 🍔",
            total_food: total_food
          });
        });
      });
    });
  });
};
// lưu đồ ăn 
exports.saveProducts = async (req, res) => {
  const { booking_id, cart } = req.body;

  try {
    for (let key in cart) {
      const item = cart[key];

      await db.query(
        `INSERT INTO booking_products 
        (booking_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)`,
        [booking_id, item.product_id, item.quantity, item.price]
      );
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json(error);
  }
};
// thống kê phòng 
exports.getStats = (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) as totalBookings,
      SUM(total_amount) as totalRevenue
    FROM bookings
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};
// Dòng doanh thu 
exports.getRevenue = async (req, res) => {

  try {

    const [day] = await db.query(`
      SELECT SUM(total_price) AS revenue
      FROM bookings
      WHERE DATE(created_at) = CURDATE()
    `);

    const [week] = await db.query(`
      SELECT SUM(total_price) AS revenue
      FROM bookings
      WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)
    `);

    const [month] = await db.query(`
      SELECT SUM(total_price) AS revenue
      FROM bookings
      WHERE MONTH(created_at) = MONTH(CURDATE())
      AND YEAR(created_at) = YEAR(CURDATE())
    `);

    res.json({
      day: day[0].revenue || 0,
      week: week[0].revenue || 0,
      month: month[0].revenue || 0
    });

  } catch (err) {
    res.status(500).json(err);
  }

};


// top phòng đặt nhiều nhất 

exports.getTopRooms = (req, res) => {

  const sql = `
    SELECT rooms.name AS room_name, COUNT(bookings.id) AS totalBookings
    FROM bookings
    JOIN rooms ON bookings.room_id = rooms.id
    GROUP BY rooms.id
    ORDER BY totalBookings DESC
    LIMIT 5
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};
exports.getRevenueByRoom = (req, res) => {

  const sql = `
    SELECT
      r.id,
      r.name,
      COALESCE(SUM(b.total_price),0) AS revenue
    FROM rooms r
    LEFT JOIN bookings b
      ON r.id = b.room_id
    GROUP BY r.id, r.name
    ORDER BY revenue DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

// Xóa booking
exports.deleteBooking = (req, res) => {

  const id = req.params.id;

  db.query(
    "DELETE FROM bookings WHERE id = ?",
    [id],
    (err, result) => {

      if (err) {
        console.error("Lỗi delete booking:", err);
        return res.status(500).json({
          message: "Lỗi server"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Không tìm thấy booking"
        });
      }

      res.json({
        message: "Xóa booking thành công"
      });

    }
  );

};
exports.getBookingStats = async (req, res) => {
  try {

    const [total] = await db.query(
      "SELECT COUNT(*) as total FROM bookings"
    );

    const [today] = await db.query(
      "SELECT COUNT(*) as today FROM bookings WHERE DATE(created_at)=CURDATE()"
    );

    const [customers] = await db.promise().query(
  "SELECT COUNT(*) AS totalCustomers FROM customers"
    );

    const [rooms] = await db.query(
      "SELECT COUNT(*) as totalRooms FROM rooms"
    );

    const [revenue] = await db.query(`
      SELECT COALESCE(SUM(total_amount),0) as revenue
      FROM bookings
      WHERE status='paid'
    `);

    res.json({
      totalBookings: total[0].total,
      todayBookings: today[0].today,
      totalCustomers: customers[0].customers,
      totalRooms: rooms[0].totalRooms,
      revenue: revenue[0].revenue
    });

  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};