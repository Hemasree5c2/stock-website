const Stock = require("./db/stockModel");
const StockData = require("./db/stockDataModel");
const { getStocks, getStockPollData } = require("./thirdParty");

const fetchStockAndPollInitialData = async () => {
  try {
    console.log("inside fetchStockAndPollInitialData");
    const stocks = await Stock.find();
    if (stocks.length) {
      console.log(`stocks already exists in db`);
      return;
    }
    const data = await getStocks();
    for (const stock of data) {
      const existingStock = await Stock.findOne({ code: stock.code });
      if (existingStock) {
        console.log(`stock already exists in db, ${stock.code}`);
        return;
      }
      const s = new Stock({
        code: stock.code,
        rate: stock.rate,
        name: stock.name,
        symbol: stock.symbol,
        image: stock.png32,
        rank: stock.rank,
      });
      s.save();
    }
    console.log("successfully saved stock details to db");
    await fetchPollStockData(true);
  } catch (e) {
    console.error("Failed to fetch stock initial data", e);
  }
};

const fetchPollStockData = async (initialLoad = false) => {
  try {
    console.log(`inside pollStockData, initialLoad:${initialLoad}`);
    const stocks = await Stock.find();
    console.log("successfully fetched stock details from db", stocks.length);
    for (const stock of stocks) {
      const history = await getStockPollData(stock.code, initialLoad);
      for (const data of history) {
        const existing = await StockData.findOne({
          stockId: stock._id.toString(),
          date: data.date,
        });
        if (!existing) {
          const sd = new StockData({
            date: data.date,
            volume: data.volume,
            rate: data.rate,
            cap: data.cap,
            stockId: stock._id,
          });
          sd.save();
        }
      }
      console.log(`successfully saved poll data for stock:${stock.code} in db`);
    }
    console.log(
      "successfully completed saving poll data for all the stocks in db"
    );
  } catch (e) {
    console.error("Failed to fetch poll data", e);
  }
};

const fetchStockDetails = async (req, res) => {
  try {
    const name = req.params.name;
    if (!name) {
      res.status(400).send({ message: "Invalid param" });
    }

    console.log(`inside fetchStockDetails for stock:${name}`);
    const stock = await Stock.findOne({ name });
    if (!stock) {
      res.status(404).send({ message: "Data not found!" });
      return;
    }
    const history = await StockData.find({
      stockId: stock._id.toString(),
    })
      .sort({ date: -1 })
      .limit(20);
    console.log("successfully fetched stock details from db");
    const data = {
      name: stock.name,
      code: stock.code,
      rate: stock.rate,
      symbol: stock.symbol,
      image: stock.image,
      rank: stock.rank,
      history,
    };
    res.json(data);
  } catch (e) {
    console.log("failed to fetch stock details from db", e);
  }
};

const fetchAllStocks = async (req, res) => {
  try {
    console.log(`inside fetchAllStocks`);
    const stocks = await Stock.find();
    console.log("successfully fetched stock details from db");
    if (!stocks) {
      res.status(404).send({ message: "No Stocks found!" });
      return;
    }
    res.json(stocks);
  } catch (e) {
    console.log("failed to fetch all stock details from db", e);
  }
};

module.exports = {
  fetchStockAndPollInitialData,
  fetchPollStockData,
  fetchStockDetails,
  fetchAllStocks,
};
