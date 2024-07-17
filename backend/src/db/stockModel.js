const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  name: String,
  code: String,
  rate: Number,
  symbol: String,
  image: String,
  rank: Number,
});

module.exports = mongoose.model.Stocks || mongoose.model("Stocks", StockSchema);
