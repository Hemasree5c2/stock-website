const mongoose = require("mongoose");

const StockDataSchema = new mongoose.Schema({
  date: String,
  volume: Number,
  rate: Number,
  cap: Number,
  stockId: mongoose.Types.ObjectId,
});

module.exports =
  mongoose.model.StocksData || mongoose.model("StocksData", StockDataSchema);
