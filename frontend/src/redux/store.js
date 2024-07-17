import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { stockReducer } from "./stock/stockReducer";

const saveToLocalStorage = (state) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("data", serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

const store = createStore(stockReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log("updated state", store.getState());
  saveToLocalStorage(store.getState());
});

export default store;
