import {connect} from "react-redux";
import Ticker from "./ticker";
import {logout}from "../../actions/session_actions"
import {fetchAllStocks, fetchStock, createStock, fetchAllOwnedStocks} from "../../actions/stock_actions";
import {fetchUser, updateUserInfo} from "../../actions/user_actions";
import {resetErrors} from "../../actions/session_actions"
import {createTransaction} from "../../actions/transaction_actions"

const msp = (state) => {
    return {
        tickers: state.entities.apiTicker,
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
        logout: () => dispatch(logout()),
        fetchOwnStockInfo: () => dispatch(fetchAllOwnedStocks()),
        fetchUser: (id) => dispatch(fetchUser(id)),
        updateUserInfo: (id, total_price) =>  dispatch(updateUserInfo(id, total_price)),
        resetErrors: () => dispatch(resetErrors())

    }
}

export default connect(msp, mdp)(Ticker);