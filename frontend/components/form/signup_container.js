import {connect} from "react-redux";
import SignUp from "./signup";
import {signup, resetErrors} from "../../actions/session_actions";

const msp = (state) => {
    
    return {
        errors: state.errors
    }
}

const mdp = (dispatch) => {
    return {
        userForm: (user) => dispatch(signup(user)),
        resetErrors: () => dispatch(resetErrors()),
        
    }
}

export default connect(msp, mdp)(SignUp);