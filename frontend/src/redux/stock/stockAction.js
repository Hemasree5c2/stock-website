import {
  SET_CURR_STOCK,
  FETCH_STOCK_DATA_SUCCESS,
  FETCH_STOCK_DATA_FAILURE,
  FETCH_STOCKS_SUCCESS,
  FETCH_STOCKS_FAILURE,
} from "./stockTypes";

export const fetchStocksSuccess = (data) => {
  return {
    type: FETCH_STOCKS_SUCCESS,
    payload: data,
  };
};

export const fetchStocksFailure = (data) => {
  return {
    type: FETCH_STOCKS_FAILURE,
    payload: data,
  };
};

export const setCurrStock = (data) => {
  return {
    type: SET_CURR_STOCK,
    payload: data,
  };
};

export const fetchStockDataSuccess = (data) => {
  return {
    type: FETCH_STOCK_DATA_SUCCESS,
    payload: data,
  };
};

export const fetchStockDataFailure = (data) => {
  return {
    type: FETCH_STOCK_DATA_FAILURE,
    payload: data,
  };
};
