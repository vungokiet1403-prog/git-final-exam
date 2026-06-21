const express = require('express');
const db = require("../config/db");
const router = express.Router();
const upload = require("../middleware/upload");

const bookingController = require('../controllers/booking.controller');

// Lấy tất cả booking
router.get('/', bookingController.getAllBookings);

// Tạo booking
router.post(
  "/",
  upload.fields([
    { name: "cccd_front", maxCount: 1 },
    { name: "cccd_back", maxCount: 1 }
  ]),
  bookingController.createBooking
);
router.get(
  "/revenue-by-room",
  bookingController.getRevenueByRoom
);

// Slot đã đặt
router.get("/booked/:roomId", bookingController.getBookedSlots);



// Thanh toán
router.post("/pay", bookingController.payBooking);

// Nếu bạn có confirm-payment riêng
router.post("/confirm-payment", bookingController.payBooking);

// lưu đồ ăn 
router.post("/save-products", bookingController.saveProducts);

// top phòng 
router.get("/top-rooms", bookingController.getTopRooms);

// Tải ảnh 

// Xóa booking
router.delete("/:id", bookingController.deleteBooking);

// các slot đặt 

router.get("/time-slots", bookingController.getAllTimeSlots);


// Lấy đồ ăn 
router.post("/add-food", bookingController.addFoodToBooking);

// Thống kê 
router.get("/stats", async (req, res) => {

  try {

    const [rooms] = await db.promise().query(
      "SELECT COUNT(*) AS totalRooms FROM rooms"
    );

    const [bookings] = await db.promise().query(
      "SELECT COUNT(*) AS totalBookings FROM bookings"
    );

    const [revenue] = await db.promise().query(`
      SELECT COALESCE(SUM(total_amount),0) AS revenue
      FROM bookings
      WHERE status='paid'
    `);

    res.json({
      totalRooms: rooms[0].totalRooms,
      totalBookings: bookings[0].totalBookings,
      revenue: revenue[0].revenue
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});
// Doanh thu 
router.get("/revenue", (req, res) => {

  const dayQuery = `
    SELECT SUM(total_amount) AS total
    FROM bookings
    WHERE DATE(created_at) = CURDATE()
    AND status = 'paid'
  `;

  const weekQuery = `
    SELECT SUM(total_amount) AS total
    FROM bookings
    WHERE YEARWEEK(created_at,1) = YEARWEEK(CURDATE(),1)
    AND status = 'paid'
  `;

  const monthQuery = `
    SELECT SUM(total_amount) AS total
    FROM bookings
    WHERE MONTH(created_at) = MONTH(CURDATE())
    AND status = 'paid'
  `;

  db.query(dayQuery, (err, dayResult) => {

    if (err) return res.status(500).json(err);

    db.query(weekQuery, (err, weekResult) => {

      if (err) return res.status(500).json(err);

      db.query(monthQuery, (err, monthResult) => {

        if (err) return res.status(500).json(err);

        res.json({
          day: dayResult[0].total || 0,
          week: weekResult[0].total || 0,
          month: monthResult[0].total || 0
        });

      });

    });

  });

});

module.exports = router;