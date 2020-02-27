import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class Transaction extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchAllTransactions();
        this.props.fetchUser(this.props.session.id.id);
    }

    displayTransaction(){
        let obj = ''
        if (Object.keys(this.props.transactions).length > 0){
            obj = Object.keys(this.props.transactions).map((transaction_id, idx) => {
                const transaction = this.props.transactions[transaction_id];
                const action = transaction.action === "buy" ? "Bought" : "Sold"
                const total_price = (transaction.price * transaction.amount).toFixed(2)
                return (
                <li key={`transactions-${idx}`} className="stock-list">
                    <div className="stock-ticker-share-container">
                        <div className="stock-shares-div-container">
                            <div className="stock-ticker">
                                <div key={`transaction-company-${idx}`} className="stock-name-text">
                                    {transaction.company}
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div keys={`transaction-ticker-${idx}`} className="stock-ticker-text">
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
                        <div className="price-open-current-container">
                            <div className="open-price-text-container">
                                <div className="open-price-text">
                                    {action} Price
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div keys={`transaction-open-${idx}`}>
                                    {parseFloat(transaction.price).toFixed(2)}
                                </div>
                            </div>
                            <div className="shares-text-container">
                                <div className="stock-shares-text">
                                    Total Price of Shares
                                </div>
                                <div className="stock-hyphen">-</div>
                                <div key={`transaction-total-${idx}`} className="total-price-text">
                                    {`$${total_price}`}
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

    render(){
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
                    <div className="header-page">Transactions</div>
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
                    {this.displayTransaction()}
                </ul>
            </div>
        )
    }
}

export default withRouter(Transaction);