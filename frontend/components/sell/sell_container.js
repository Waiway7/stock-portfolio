import {connect} from "react-redux";
import Sell from "./sell";
import {logout}from "../../actions/session_actions"
import {fetchAllStocks, fetchStock, fetchAllOwnedStocks, createStock} from "../../actions/stock_actions";
import {fetchUser, updateUserInfo} from "../../actions/user_actions";
import {resetErrors} from "../../actions/session_actions"
import {createTransaction} from "../../actions/transaction_actions"

const msp = (state) => {
    return {
        tickers: state.entities.tickers,
        stocks: state.entities.stocks,
        session: state.session,
        user: state.entities.user,
        error: state.backend.error
    }
}

const mdp = (dispatch) => {
    return {
        fetchAllStocks: () => dispatch(fetchAllStocks()),
        fetchStock: (ticker) => dispatch(fetchStock(ticker)),
        createTransaction: (transaction) => dispatch(createTransaction(transaction)),
        createStock: (stock) => dispatch(createStock(stock)),
        fetchOwnStockInfo: () => dispatch(fetchAllOwnedStocks()),
        logout: () => dispatch(logout()),
        fetchUser: (id) => dispatch(fetchUser(id)),
        updateUserInfo: (id, total_price) =>  dispatch(updateUserInfo(id, total_price)),
        resetErrors: () => dispatch(resetErrors())
    }
}

export default connect(msp, mdp)(Sell);