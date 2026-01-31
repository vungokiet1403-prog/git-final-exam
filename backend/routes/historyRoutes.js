const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

/* =========================
   SCHEMA + MODEL
   (viết gọn trong route)
========================= */
const FarmingHistorySchema = new mongoose.Schema(
  {
    batchCode: {
      type: String,
      required: true
    },
    timeline: [
      {
        date: String,
        action: String,
        detail: String,
        actor: String
      }
    ]
  },
  { collection: "farming_histories" } // 🔥 đúng tên collection trong MongoDB
);

const FarmingHistory = mongoose.model(
  "FarmingHistory",
  FarmingHistorySchema
);

/* =========================
   GET HISTORY BY BATCH CODE
========================= */
router.get("/:batchCode", async (req, res) => {
  try {
    const { batchCode } = req.params;

    const history = await FarmingHistory.findOne({ batchCode });

    if (!history) {
      return res.status(404).json({
        message: "Không tìm thấy lịch sử canh tác"
      });
    }

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server",
      error: error.message
    });
  }
});

module.exports = router;
