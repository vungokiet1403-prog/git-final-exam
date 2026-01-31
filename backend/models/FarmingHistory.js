const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  date: String,
  action: String,
  detail: String,
  actor: String
});

const FarmingHistorySchema = new mongoose.Schema({
  batchCode: String,
  timeline: [HistorySchema]
});

module.exports = mongoose.model("FarmingHistory", FarmingHistorySchema);
