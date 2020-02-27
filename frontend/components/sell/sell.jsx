import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class Sell extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ticker:'',
            qty:'',
            total_price: 0,
            trans: "sell"
        }
    }

    componentDidMount(){
        this.props.resetErrors();
        this.props.fetchAllStocks();
        this.props.fetchUser(this.props.session.id.id);
    }

    componentDidUpdate(prevProps){
        if (prevProps.tickers !== this.props.tickers){
            this.props.fetchAllStocks();
            this.props.fetchUser(this.props.session.id.id);
        }
    }
   
    handleStockChange(){
        const id = event.target.querySelector(`.${event.target.value}`).id;
        this.setState({"ticker":event.target.value, "id": id})
        this.props.fetchStock(event.target.value)
    }

    handleQuantityChange(){
        this.setState({"current_price": this.props.tickers.current_price, 
                        "company": this.props.stocks[this.state.id].company,
                        "qty": Number(event.target.value), 
                        "total_price": (Number(event.target.value) * parseFloat(this.props.tickers.current_price)),
                        "symbol": this.props.tickers.symbol
                    })
    }

    handleSubmit(e){
        e.preventDefault();
        if (Object.keys(this.props.stocks).length > 0 && this.props.stocks[this.state.id].shares > 0){
            let formData = new FormData()
            formData.append('total_price', this.state.total_price)
            formData.append('trans', this.state.trans)
            this.props.createStock(this.state)
            this.props.createTransaction(this.state)
            this.props.updateUserInfo(this.props.session.id.id, formData).then(() => {
                window.alert("Your transaction was safely processed.")
            }, error => {window.alert("Transaction was unsucessful please try again.")})
        }
    }

    selectTicker(){
        let ticker = "";
        if (Object.keys(this.props.stocks).length > 0){
            ticker = Object.keys(this.props.stocks).map( (stock_id, idx) => {
                const stock = this.props.stocks[stock_id]
                return (
                    <option key={`stock-sell${idx}`} className={stock.ticker} value={stock.ticker} id={stock_id}>{stock.ticker}</option>
                )
            })
        }
        return ticker
    }
    
    selectQuantity(){
        let quantity = 0;
        if (this.state.id !== undefined){
            quantity = [];
            for (let i = 1; i <= this.props.stocks[this.state.id].shares; i++){
            const option = <option key={`qty-stock-owned-${i}`} value={`${i}`}>{i}</option>
            quantity.push(option)
            }
            
        }
        return quantity
    }

    render () {
        const balance = this.props.user ? parseFloat(this.props.user.balance).toFixed(2) : "";
        const equity = this.props.user ? parseFloat(this.props.user.equity).toFixed(2) : "";
        const currentPrice = this.props.tickers.current_price !== undefined ? parseFloat(this.props.tickers.current_price).toFixed(2) : 0.00.toFixed(2);
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
                <div className="header-page">Sell Shares</div>
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
            <div className="owned-stock-container">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="owned-select-container">
                        <div className="title-owned-Stock">Select Stocks Owned</div>
                    <div className="select-style">
                        <select value={this.state.ticker} onChange={this.handleStockChange.bind(this)}>
                            <option disabled={true} value="">Select a Stock</option>
                            {this.selectTicker()}
                        </select>
                    </div>
                    </div>
                    <div className="owned-select-container">
                    <div className="title-owned-stock">Quantity</div>
                    <div className="select-style">
                        <select value={this.state.qty} onChange={this.handleQuantityChange.bind(this)}>
                            <option disabled={true} value="">Select Qty</option>
                            {this.selectQuantity()}
                        </select>
                    </div>
                    </div>
                    <input type="hidden" value={this.state.total_price}></input>
                    <div className="owned-stock-input-container">
                        <div>Current Value</div>
                        <div className="current-price-text-sell">${currentPrice}</div>
                    </div>
                    <div className="owned-stock-input-container">
                        <div>Total Value</div> 
                        <div>${parseFloat(this.state.total_price).toFixed(2)}</div>
                    </div>
                    <div className="owned-stock-input-container">
                        <div></div>
                        <input className="submit-sell" type="submit" value="Sell"></input>
                    </div>
                </form>
            </div>
            
        </div>
        )
    }
}

export default Sell