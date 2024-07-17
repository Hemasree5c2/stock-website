const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const cron = require("node-cron");
const dbConnect = require("./db/dbConnect");
const {
  fetchStockAndPollInitialData,
  fetchPollStockData,
  fetchStockDetails,
  fetchAllStocks,
} = require("./stockService");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
dbConnect();

const port = process.env.PORT || "5000";

io.on("connection", (socket) => {
  console.log("User", socket.id);
});

app.get("/stock", fetchAllStocks);

app.get("/stock/:name", fetchStockDetails);

server.listen(port, () => {
  console.log("Listening on " + port);
  fetchStockAndPollInitialData();
});

cron.schedule("*/5 * * * *", async () => {
  await fetchPollStockData(false);
  console.log("emit event from backend");
  io.emit("update", "stock data got updated");
});
