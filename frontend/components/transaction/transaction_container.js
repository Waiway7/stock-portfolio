import {connect} from "react-redux";
import Transaction from "./transaction";
import {fetchAllTransactions} from "../../actions/transaction_actions";
import {fetchUser} from "../../actions/user_actions"
import {logout} from "../../actions/session_actions"

const msp = (state) => {
    
    return {
        transactions: state.entities.transactions,
        session: state.session,
        user: state.entities.user
    }
}

const mdp = (dispatch) => {
    return {
        fetchAllTransactions: () => dispatch(fetchAllTransactions()),
        logout: () => dispatch(logout()),
        fetchUser: (id) => dispatch(fetchUser(id))
    }
}

export default connect(msp, mdp)(Transaction);