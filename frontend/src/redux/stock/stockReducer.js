import axios from "axios";
import {
  SET_CURR_STOCK,
  FETCH_STOCK_DATA_SUCCESS,
  FETCH_STOCK_DATA_FAILURE,
  FETCH_STOCKS_SUCCESS,
  FETCH_STOCKS_FAILURE,
} from "./stockTypes";
import {
  fetchStockDataFailure,
  fetchStockDataSuccess,
  fetchStocksFailure,
  fetchStocksSuccess,
} from "./stockAction";
const BASE_URL = process.env.BACKEND_BASE_URL || "http://localhost:5000";

const initialState = {
  stocks: [],
  currStock: null,
  stockData: {},
  stocksError: "",
  stockDataError: "",
};

export const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURR_STOCK:
      return {
        ...state,
        currStock: action.payload,
      };
    case FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        stocks: action.payload,
        currStock: action.payload[0],
      };
    case FETCH_STOCKS_FAILURE:
      return {
        ...state,
        stocksError: action.payload,
      };
    case FETCH_STOCK_DATA_SUCCESS:
      return {
        ...state,
        stockData: action.payload,
      };
    case FETCH_STOCK_DATA_FAILURE:
      return {
        ...state,
        stockDataError: action.payload,
      };
  }
};

export const fetchStocks = () => {
  return function (dispatch) {
    axios
      .get(`${BASE_URL}/stock`)
      .then((response) => dispatch(fetchStocksSuccess(response.data)))
      .catch((e) => dispatch(fetchStocksFailure(e.message)));
  };
};

export const fetchStockData = (stock) => {
  return function (dispatch) {
    if (stock?.name) {
      axios
        .get(`${BASE_URL}/stock/${stock?.name}`)
        .then((response) => dispatch(fetchStockDataSuccess(response.data)))
        .catch((e) => dispatch(fetchStockDataFailure(e.message)));
    }
  };
};
