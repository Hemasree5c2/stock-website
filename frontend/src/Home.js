import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "./components/DropDown";
import CustomTable from "./components/Table";
import { fetchStockData, fetchStocks } from "./redux/stock/stockReducer";
import { setCurrStock } from "./redux/stock/stockAction";
import { Box, Grid } from "@mui/material";

const BASE_URL = process.env.BACKEND_BASE_URL || "http://localhost:5000";
let socket = io.connect(BASE_URL, {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
});

const Home = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state?.stocks);
  const currStock = useSelector((state) => state?.currStock);
  const stockData = useSelector((state) => state?.stockData);
  const stockDataError = useSelector((state) => state?.stockDataError);
  const stockError = useSelector((state) => state?.stocksError);

  useEffect(() => {
    dispatch(fetchStocks());
    socket.on("update", async () => {
      console.log("received event from backend");
      const data = JSON.parse(localStorage.getItem("data"));
      dispatch(fetchStockData(data.currStock));
    });
  }, []);

  useEffect(() => {
    dispatch(fetchStockData(currStock));
  }, [currStock]);

  const handleDropDownChange = (event) => {
    dispatch(setCurrStock(event.target.value));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={4}></Grid>
        <Grid item xs={6}>
          <h2>Welcome to stock market website!</h2>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={1}>
          <h4>Stock Name:</h4>
        </Grid>
        <Grid item xs={2}>
          <DropDown
            handleDropDownChange={handleDropDownChange}
            items={stocks}
            value={currStock}
            error={stockError}
          />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={9}>
          <CustomTable data={stockData} error={stockDataError} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
