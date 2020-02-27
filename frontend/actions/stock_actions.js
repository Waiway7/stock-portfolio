import * as StockApiUtil from "../util/stock_util";

export const RECEIVE_ALL_STOCKS = 'RECEIVE_ALL_STOCKS';
export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const RECEIVE_API_STOCK = 'RECEIVE_API_STOCK';
export const RECEIVE_OWNED_STOCK_INFORMATION = 'RECEIVE_OWNED_STOCK_INFORMATION '
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

const receiveStock = (stock) => {
    return {
        type: RECEIVE_STOCK,
        stock
    }
}

const receiveOwnedStockInformation = (stocks) => {
    return {
        type: RECEIVE_OWNED_STOCK_INFORMATION,
        stocks
    }
}

const receiveApiStock = (stock) => {
    return {
        type: RECEIVE_API_STOCK,
        stock
    }
} 

const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
})

const receiveAllStocks = (stocks) => {
    return {
        type: RECEIVE_ALL_STOCKS,
        stocks
    }
}

export const createStock = (stock) => {
    return dispatch => {
        return StockApiUtil.createStock(stock)
            .then((stock) => dispatch(receiveStock(stock)), error => {
                return dispatch(receiveErrors(error))
            })
    }
}

export const fetchStock = (ticker) => {
    return dispatch => {
        return StockApiUtil.fetchStock(ticker)
            .then((stock) => {
                return dispatch(receiveApiStock(stock))}, error => {
                return dispatch(receiveErrors(error))
            })
    }
}

export const fetchAllStocks = () => {
    return dispatch => {
        return StockApiUtil.fetchAllStocks()
            .then(stocks => dispatch(receiveAllStocks(stocks)), error => {
                return dispatch(receiveErrors(error))
            })
    }
}

export const fetchAllOwnedStocks = () => {
    return dispatch => {
        return StockApiUtil.fetchInfoOwnedStock()
            .then(stocks => dispatch(receiveOwnedStockInformation(stocks)), error => {
                return dispatch(receiveErrors(error))
            })
    }
}