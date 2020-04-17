import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class Transaction extends React.Component {
   
    constructor(props){
        super(props)
        this._isMounted = false;
        this.state = {
            isLoading: true
        }
    }

    componentDidMount(){
        this._isMounted = true;
        this.props.fetchAllTransactions();
        this.props.fetchUser(this.props.session.id.id);
        this.props.fetchAllOwnedStocks().then((data) => {
            let obj = {};
            for (let id in data.stocks.ticker){
                let price = {};
                price["current_price"] = data.stocks.ticker[id].current_price;
                obj[data.stocks.ticker[id].ticker] = price;
            }
            this.setState({stocks: obj, isLoading: false})
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    toFixed(number, decimals) {
        var x = Math.pow(10, Number(decimals) + 1);
        return (Number(number) + (1 / x)).toFixed(decimals)
    }

    displayTransaction(){
        let obj = ''
        if (Object.keys(this.props.transactions).length > 0 && this.state.stocks){
            obj = Object.keys(this.props.transactions).map((transaction_id, idx) => {
                const transaction = this.props.transactions[transaction_id];
                const currPrice = this.toFixed(this.state.stocks[transaction.ticker].current_price, 2);
                const action = transaction.action === "buy" ? "Bought" : "Sold"
                const total_price = this.toFixed(transaction.price * transaction.amount, 2)
                let color = "current-price-number"
                if (currPrice > transaction.price){color = "green current-price-number"}
                else if (currPrice < transaction.price) {color = "red current-price-number"}
                else {color = "gray current-price-number"}

                return (
                <li key={`transactions-${idx}`} className="stock-list">
                    <div className="stock-ticker-share-container">
                        <div className="stock-shares-div-container">
                            <div className="stock-ticker">
                                <div key={`transaction-company-${idx}`} className="stock-name-text">
                                    {transaction.company}
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div keys={`transaction-ticker-${idx}`} className={color}>
                                    {transaction.ticker}
                                </div>
                            </div>
                            <div className="shares-text-container">
                                <div className="stock-shares-text">
                                    Shares({action})
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`transaction-qty-${idx}`} className="share-text">
                                    {transaction.amount}
                                </div>
                            </div>
                            <div className="date-container">
                                <div className="stock-shares-text">
                                    Transaction Date
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`transaction-qty-${idx}`} className="share-text">
                                    {transaction.date}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="transaction-price-info">
                            <div className="open-price-text-container">
                                <div className="stock-shares-text">
                                    Total Price of Shares
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`transaction-total-${idx}`} className="total-price-text">
                                    {`$${total_price}`}
                                </div>
                            </div>
                            <div className="shares-text-container">
                                <div className="open-price-text">
                                    {action} Price
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div keys={`transaction-open-${idx}`} className={color}>
                                    ${this.toFixed(transaction.price, 2)}
                                </div>
                            </div>
                            <div className="shares-text-container">
                                <div className="stock-shares-text">
                                    Latest Price
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`transaction-total-${idx}`} className="total-price-text">
                                    {`$${currPrice}`}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                )
            })
        }
        return obj
    }

    displayEquity(){
        let equity = 0;
        if (Object.keys(this.props.stocks).length > 0 && Object.keys(this.props.tickers).length){
            for (let id in this.props.stocks){
                equity += this.props.stocks[id].shares * this.props.tickers[id].current_price
            }
        }
        return this.toFixed(equity, 2);
    }

    render(){
        
        return (
            <div className="portfolio-container">
                    <div className="portfolio-header">
                    <div className="header-page">Transactions (${this.displayEquity()})</div>
                    </div>
                <div className="stock-container-ul">
                    {this.displayTransaction()} 
                </div>
            </div>
        )
    }
}

export default withRouter(Transaction);