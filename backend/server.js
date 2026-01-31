const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(cors());
app.use(express.json());

/* ======================
   MONGODB CONNECT
====================== */
mongoose
  .connect("mongodb://127.0.0.1:27017/myyproject")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

/* ======================
   ROUTES
====================== */
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));

/* ======================
   TEST ROOT API
====================== */
app.get("/", (req, res) => {
  res.json({
    message: "API is running 🚀"
  });
});

/* ======================
   SERVER LISTEN
====================== */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
