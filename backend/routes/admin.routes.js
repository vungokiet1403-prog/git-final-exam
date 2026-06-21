const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const { verifyToken, isAdmin } = require("../middleware/auth.middleware");

const { checkAdminSession } = require("../middleware/adminSession.middleware");

router.post("/staff", verifyToken, isAdmin, adminController.createStaff);
router.get("/users", adminController.getUsers);
router.delete("/users/:id", adminController.deleteUser);
router.get("/food-orders", adminController.foodOrders);
router.get("/dashboard", checkAdminSession, (req, res) => {
    res.json({ message: "Welcome Admin", admin: req.session.admin });
});

// doanh thu hôm nay
router.get("/revenue/today", async (req, res) => {

  const [rows] = await db.query(`
    SELECT SUM(total_price) AS revenue
    FROM bookings
    WHERE DATE(created_at) = CURDATE()
  `);

  res.json({ revenue: rows[0].revenue || 0 });

});

// doanh thu tuần
router.get("/revenue/week", async (req, res) => {

  const [rows] = await db.query(`
    SELECT SUM(total_price) AS revenue
    FROM bookings
    WHERE YEARWEEK(created_at,1) = YEARWEEK(CURDATE(),1)
  `);

  res.json({ revenue: rows[0].revenue || 0 });
});
// doanh thu tháng
router.get("/revenue/month", async (req, res) => {

  const [rows] = await db.query(`
    SELECT SUM(total_price) AS revenue
    FROM bookings
    WHERE MONTH(created_at) = MONTH(CURDATE())
  `);

  res.json({ revenue: rows[0].revenue || 0 });

});

module.exports = router;