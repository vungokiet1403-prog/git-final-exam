require("dotenv").config();
require("./config/db");

const express = require("express");
const cors = require("cors");
const session = require("express-session");




const app = express();

// ===== Middleware =====
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// ===== Session =====
app.use(
  session({
    secret: "baphomestay_secret",
    resave: false,
    saveUninitialized: true
  })
);

// ===== Static folders =====
app.use("/uploads", express.static("uploads"));
app.use("/images", express.static("images"));

// ===== Routes =====
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const bookingRoutes = require("./routes/booking.routes");
const roomRoutes = require("./routes/room.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const foodRoutes = require("./routes/Food.Routes");


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/food", foodRoutes);
app.use("/images", express.static("images"));  // khai báo ảnh adminfood
app.use("/uploads", express.static("uploads"));

// ===== Test API =====
app.get("/", (req, res) => {
  res.send("Backend Bắp Homestay đang chạy 🚀");
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});