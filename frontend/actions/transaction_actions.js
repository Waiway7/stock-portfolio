import * as TransactionApiUtil from '../util/transactions_util';

export const RECEIVE_ALL_TRANSACTIONS = 'RECEIVE_ALL_TRANSACTIONS';
export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';


const receiveTransaction = (transaction) => {
    return {
        type: RECEIVE_TRANSACTION,
        transaction
    }
}

const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
})

const receiveAllTransactions = (transactions) => {
    return {
        type: RECEIVE_ALL_TRANSACTIONS,
        transactions
    }
}

export const createTransaction = (transaction) => {
    return dispatch => {
        return TransactionApiUtil.createTransaction(transaction)
            .then((transaction) => dispatch(receiveTransaction(transaction)), error => {
                return dispatch(receiveErrors(error))
            })
    }
}

export const fetchAllTransactions = () => {
    return dispatch => {
        return TransactionApiUtil.fetchAllTransactions()
            .then(transactions => dispatch(receiveAllTransactions(transactions)), error => {
                return dispatch(receiveErrors(error))
            })
    }
}