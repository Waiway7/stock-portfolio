import {RECEIVE_API_STOCK, RECEIVE_OWNED_STOCK_INFORMATION} from "../../actions/stock_actions"
import {LOGOUT_USER} from "../../actions/session_actions"
import {merge} from "lodash";


const _nullSession = {
};

const tickerReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type){
        case RECEIVE_API_STOCK:
            return merge({}, action.stock);
        case RECEIVE_OWNED_STOCK_INFORMATION:
            return merge({}, action.stocks.ticker)
        case LOGOUT_USER:
            return _nullSession
        default:
            return state;
    }
}

export default tickerReducer