import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class Portfolio extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.resetErrors();
        this.props.fetchAllStocks();
        this.props.fetchUser(this.props.session.id.id);
    }
    componentDidUpdate(prevProps){
        if (this.props.stocks !== prevProps.stocks){
            this.props.fetchOwnStockInfo()
        }
    }

    toFixed(number, decimals) {
        var x = Math.pow(10, Number(decimals) + 1);
        return (Number(number) + (1 / x)).toFixed(decimals)
    }

    render(){
        let obj = "";
        let equity = 0;
        if (Object.keys(this.props.tickers).length !==  0 && Object.keys(this.props.stocks).length !== 0){
            obj = Object.keys(this.props.stocks).map((stock_id, i) => {
                const stock = this.props.stocks[stock_id]
                const ticker = this.props.tickers[stock_id]
                const open = this.props.open !== undefined ? this.toFixed(parseFloat(ticker.open), 2) : this.toFixed(ticker.prevClose, 2);
                const priceTitle = this.props.open !== undefined ? "Open Price" : "Previous Close Price";
                const total = this.toFixed(parseFloat(ticker.current_price * stock.shares), 2);
                equity += ticker.current_price * stock.shares;
                let color = "current-price-number"
                if (ticker.current_price > ticker.open){color = "green current-price-number"}
                else if (ticker.current_price < ticker.open) {color = "red current-price-number"}
                else {color = "gray current-price-number"}
                if (stock.shares > 0){
                return (
                <li key={`stock-${i}`} className="stock-list">
                    <div className="stock-ticker-share-container">
                        <div className="stock-shares-div-container">
                            <div className="stock-ticker">
                                <div key={`stock-ticker-${i}`} className={color}>
                                    {stock.ticker}
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`stock-qty-${i}`} className="share-text">
                                    Shares {stock.shares}
                                </div>
                            </div>
                            <div className="shares-text-container">
                                <div key={`stock-company-${i}`} className={"stock-name-text"}>
                                    {stock.company}
                                </div>
                            </div>
                            <div className="shares-text-container">
                                <div className="current-price-text">
                                    Current Value
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`stock-total-${i}`} className={color}>
                                    {`$${total}`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="price-open-current-container">
                            <div className="open-price-text-container">
                                <div className="open-price-text">
                                    {priceTitle}
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`stock-open-${i}`}>
                                    ${open}
                                </div>
                            </div>
                            <div className="current-price-text-container">
                                <div className="current-price-text">
                                    Latest Price
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`stock-current-${i}`} className={color}>
                                    ${this.toFixed(ticker.current_price, 2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                )
            }})
        }
        if (this.props.error.length){
            obj = <div className="stock-list error-handling">
                Please try again
            </div>
        }
        return (
            <div className="portfolio-container">
                <div className="portfolio-header">
                    <div className="header-page">Portfolio (${`${this.toFixed(equity, 2)}`})</div>
                </div>
                <div className="stock-container-ul">
                    {obj}
                </div>
            </div>
        )
    }
}

export default withRouter(Portfolio);