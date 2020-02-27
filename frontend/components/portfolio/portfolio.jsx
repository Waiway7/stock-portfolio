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

    render(){
        let obj = "";
        if (Object.keys(this.props.tickers).length === Object.keys(this.props.stocks).length){
            obj = Object.keys(this.props.stocks).map((stock_id, i) => {
                const stock = this.props.stocks[stock_id]
                const ticker = this.props.tickers[stock_id]
                let color = "current-price-number"
                if (ticker.current_price > ticker.open){color = "green current-price-number"}
                else if (ticker.current_price < ticker.open) {color = "red current-price-number"}
                else {color = "gray current-price-number"}
                return (
                <li key={`stock-${i}`} className="stock-list">
                    <div className="stock-ticker-share-container">
                        <div className="stock-shares-div-container">
                            <div className="stock-ticker">
                                <div key={`stock-company-${i}`} className={"stock-name-text"}>
                                    {stock.company}
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`stock-ticker-${i}`} className={color}>
                                    {stock.ticker}
                                </div>
                            </div>
                            <div className="shares-text-container">
                                <div className="stock-shares-text">
                                    Shares(Owned)
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`stock-qty-${i}`} className="share-text">
                                    {stock.shares}
                                </div>
                            </div>
                            <div className="shares-text-container">
                                <div className="stock-shares-text">
                                    Total Price of Shares
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`stock-total-${i}`} className="total-price-text">
                                    {`$${parseFloat(stock.total_price).toFixed(2)}`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="price-open-current-container">
                            <div className="open-price-text-container">
                                <div className="open-price-text">
                                    Open Price
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`stock-open-${i}`}>
                                    {parseFloat(ticker.open).toFixed(2)}
                                </div>
                            </div>
                            <div className="current-price-text-container">
                                <div className="current-price-text">
                                    Current Price
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`stock-current-${i}`} className={color}>
                                    {parseFloat(ticker.current_price).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                )
            })
        }
        if (this.props.error.length){
            obj = <div className="stock-list error-handling">
                Please try again in 1 minute as Alpha Vantage API call frequency is 5 calls per minute and 500 calls per day
            </div>
        }
        const balance = this.props.user ? parseFloat(this.props.user.balance).toFixed(2) : "";
        const equity = this.props.user ? parseFloat(this.props.user.equity).toFixed(2) : "";
        return (
            <div className="portfolio-container">
                <div className="tabs">
                    <div className="user-welcome">
                        <div className="user-name">User: {this.props.session.id.username}</div>
                        <div className="straight-line">|</div>
                        <div className="user-name">Balance: ${balance}</div>
                        <div className="straight-line">|</div>
                        <div className="user-name">Equity: ${equity}</div>
                    </div>
                    <div className="header-page">Portfolio</div>
                    <div className="links-container">
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/ticker"><div className="buy-shares">Buy Shares</div></Link>
                        <div className="straight-line">|</div>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/sell"><div className="transactions">Sell Shares</div></Link>
                        <div className="straight-line">|</div>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/portfolio"><div className="portfolio">Portfolio</div></Link>
                        <div className="straight-line">|</div>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/transactions"><div className="transactions">Transactions</div></Link>
                        <div className="straight-line">|</div>
                        
                        <div className="logout-btn" onClick={() => this.props.logout()}>Logout</div> 
                    </div>
                </div>
                <ul className="stock-container-ul">
                    {obj}
                </ul>
            </div>
        )
    }
}

export default withRouter(Portfolio);