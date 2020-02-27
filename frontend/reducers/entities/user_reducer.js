import {ENCOUNTER_USER} from "../../actions/user_actions";
import {LOGOUT_USER} from "../../actions/session_actions"
import {merge} from "lodash";

const _nullSession = {}

const userReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type){
        case ENCOUNTER_USER:
            return merge({}, action.info);
        case LOGOUT_USER:
            return _nullSession
        default:
            return state;
    }
}

export default userReducer