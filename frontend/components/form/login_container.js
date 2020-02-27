import {connect} from "react-redux";
import Login from "./login"
import {login, resetErrors} from "../../actions/session_actions"

const msp = (state) => {
    const errors = state.errors || []
    return {
        errors
    }
}

const mdp = dispatch => {
    return {
        userForm: (user) => dispatch(login(user)),
        resetErrors: () => dispatch(resetErrors())

    };
};

export default connect(msp, mdp)(Login)