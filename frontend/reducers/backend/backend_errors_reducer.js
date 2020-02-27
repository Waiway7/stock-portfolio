import {RECEIVE_ERRORS} from "../../actions/stock_actions";
import {RESET_ERRORS} from "../../actions/session_actions"


const backReducer = (state = {}, action) => {
    switch(action.type){
        case RECEIVE_ERRORS:
            return action.errors;
        case RESET_ERRORS:
            return {};
        default: 
            return state;
    }
}

export default backReducer;