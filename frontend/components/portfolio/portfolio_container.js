import {connect} from "react-redux";
import Portfolio from "./portfolio";
import {fetchAllStocks, fetchStock, createStock, fetchAllOwnedStocks} from "../../actions/stock_actions";
import {resetErrors} from "../../actions/session_actions"
import {fetchUser} from "../../actions/user_actions"
import {logout} from "../../actions/session_actions"

const msp = (state) => {
    
    return {
        stocks: state.entities.stocks,
        tickers: state.entities.tickers,
        session: state.session,
        user: state.entities.user,
        error: state.backend.error
    }
}

const mdp = (dispatch) => {
    return {
        fetchAllStocks: () => dispatch(fetchAllStocks()),
        fetchStock: (ticker) => dispatch(fetchStock(ticker)),
        fetchOwnStockInfo: () => dispatch(fetchAllOwnedStocks()),
        logout: () => dispatch(logout()),
        fetchUser: (id) => dispatch(fetchUser(id)),
        resetErrors: () => dispatch(resetErrors())
    }
}

export default connect(msp, mdp)(Portfolio);