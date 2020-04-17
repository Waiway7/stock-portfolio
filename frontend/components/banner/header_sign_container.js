import {connect} from "react-redux";
import Header from "./header_sign"
import {login, resetErrors} from "../../actions/session_actions"

const msp = (state) => {
    const errors = state.errors || []
    return {
        errors
    }
}

const mdp = dispatch => {
    return {
        login: (user) => dispatch(login(user)),
        resetErrors: () => dispatch(resetErrors())
    };
};

export default connect(msp, mdp)(Header)