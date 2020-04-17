import {connect} from "react-redux";
import Landpage from "./landpage"
import {sell, buy, transactions, portfolio} from "../../actions/component_switch_actions"


const msp = (state) => {
    return {
        bs: state.ui.bs
    }
}

const mdp = dispatch => {
    return {
        sell: () => dispatch(sell()),
        buy: () => dispatch(buy()),
        transactions: () => dispatch(transactions()),
        portfolio: () => dispatch(portfolio())
    };
};

export default connect(msp, mdp)(Landpage)