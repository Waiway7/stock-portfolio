import {connect} from "react-redux";
import Transaction from "./transaction";
import {fetchAllTransactions} from "../../actions/transaction_actions";
import {fetchUser} from "../../actions/user_actions"
import {logout} from "../../actions/session_actions"
import {fetchAllOwnedStocks} from "../../actions/stock_actions";

const msp = (state) => {
    
    return {
        transactions: state.entities.transactions,
        session: state.session,
        user: state.entities.user,
        tickers: state.entities.tickers,
        stocks: state.entities.stocks
    }
}

const mdp = (dispatch) => {
    return {
        fetchAllOwnedStocks: () => dispatch(fetchAllOwnedStocks()),
        fetchAllTransactions: () => dispatch(fetchAllTransactions()),
        logout: () => dispatch(logout()),
        fetchUser: (id) => dispatch(fetchUser(id))
    }
}

export default connect(msp, mdp)(Transaction);