import {connect} from "react-redux";
import Header from "./header"
import {sell, buy, transactions, portfolio} from "../../actions/component_switch_actions"
import {logout} from "../../actions/session_actions"

const msp = (state) => {
    return {
        loggedIn: Boolean(state.session.id),
        bs: state.ui.bs
    }
}

const mdp = dispatch => {
    return {
        sell: () => dispatch(sell()),
        buy: () => dispatch(buy()),
        transactions: () => dispatch(transactions()),
        logout: () => dispatch(logout()),
        portfolio: () => dispatch(portfolio())
    };
};

export default connect(msp, mdp)(Header)