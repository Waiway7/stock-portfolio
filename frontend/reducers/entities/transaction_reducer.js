import {RECEIVE_ALL_TRANSACTIONS, RECEIVE_TRANSACTION} from "../../actions/transaction_actions";
import {LOGOUT_USER} from "../../actions/session_actions"
import {merge} from "lodash";

const _nullSession = {
};

const transactionReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type){
        case RECEIVE_ALL_TRANSACTIONS:
            return merge({}, action.transactions);
        case RECEIVE_TRANSACTION:
            return ({}, state, {[action.transaction.id]: action.transaction});
        case LOGOUT_USER:
            return _nullSession
        default:
            return state;
    }
}

export default transactionReducer