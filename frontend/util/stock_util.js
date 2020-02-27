export const fetchAllStocks = () => {
    return $.ajax({
        method: "GET",
        url: "api/stocks"
    })
}

export const fetchStock = (ticker) => {
    return $.ajax({
        method: "GET",
        url: `api/tickers/${ticker}`
    })
}

export const createStock = (stock) => {
    return $.ajax({
        method: "POST",
        url: "api/stocks",
        data: {stock}
    })
}

export const fetchInfoOwnedStock = () => {
    return $.ajax({
        method: "GET",
        url: "api/tickers"
    })
}