import {RECEIVE_API_STOCK} from "../../actions/stock_actions"
import {LOGOUT_USER} from "../../actions/session_actions"
import {merge} from "lodash";


const _nullSession = {
};

const tickerApiReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type){
        case RECEIVE_API_STOCK:
            return merge({}, action.stock);
        case LOGOUT_USER:
            return _nullSession
        default:
            return state;
    }
}

export default tickerApiReducer