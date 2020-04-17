import {RECEIVE_ALL_STOCKS, RECEIVE_STOCK} from "../../actions/stock_actions";
import {LOGOUT_USER} from "../../actions/session_actions";
import {merge} from "lodash";


const _nullSession = {
};

const stockReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type){
        case RECEIVE_ALL_STOCKS:
            return merge({}, action.stocks);
        case RECEIVE_STOCK:
            return merge({}, state, {[action.stock.id]: action.stock});
        case LOGOUT_USER:
            return _nullSession
        default:
            return state;
    }
}

export default stockReducer