import {combineReducers} from "redux";
import transactions from "./transaction_reducer";
import stocks from "./stock_reducer";
import tickers from "./ticker_reducer";
import user from "./user_reducer";

const entities = combineReducers({
    transactions,
    stocks,
    tickers,
    user
});

export default entities;