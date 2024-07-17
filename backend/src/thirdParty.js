const axios = require("axios");
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

const getStocks = async () => {
  try {
    console.log("trigger coins/list API to get stock details");
    const response = await axios.post(
      `${API_BASE_URL}/list`,
      {
        currency: "USD",
        sort: "rank",
        order: "ascending",
        offset: 0,
        limit: 6,
        meta: true,
      },
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": API_KEY,
        },
      }
    );
    console.log(
      "successfully fetched stock details from API",
      response.data?.length
    );
    return response.data;
  } catch (e) {
    console.error("Failed to get stock details from API", e);
  }
};

const getStockPollData = async (code, initialLoad) => {
  try {
    const current = new Date();
    const endTime = new Date().valueOf();
    const startTime =
      initialLoad == true
        ? current.setHours(current.getHours() - 12)
        : current.setMinutes(current.getMinutes() - 5);
    console.log(
      `trigger single/history API to get stock live data for stock:${code} and startTime:[${startTime}], endTime:[${endTime}]`
    );
    const response = await axios.post(
      `${API_BASE_URL}/single/history`,
      {
        currency: "USD",
        code,
        start: startTime,
        end: endTime,
        meta: false,
      },
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": API_KEY,
        },
      }
    );
    console.log(
      `successfully fetched poll data for stock:${code} from API`,
      response.data?.history.length
    );
    return response.data?.history;
  } catch (e) {
    console.error("Failed to get stock live data from API", e);
  }
};

module.exports = { getStocks, getStockPollData };
