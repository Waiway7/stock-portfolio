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

    // componentDidUpdate(prevProps){
    //     if (prevProps.tickers !== this.props.tickers){
    //         this.props.fetchAllStocks();
    //         this.props.fetchUser(this.props.session.id.id);
    //     }
    // }

    toFixed(number, decimals) {
        var x = Math.pow(10, Number(decimals) + 1);
        return (Number(number) + (1 / x)).toFixed(decimals)
    }
   
    handleStockChange(){
        const id = event.target.querySelector(`.${event.target.value}`).id;
        this.setState({"ticker":event.target.value, "id": id})
        this.props.fetchStock(event.target.value)
    }

    handleQuantityChange(){
        this.setState({"current_price": this.props.tickers[this.state.id].current_price, 
                        "company": this.props.stocks[this.state.id].company,
                        "qty": Number(event.target.value), 
                        "total_price": (this.toFixed(Number(event.target.value) * this.props.tickers[this.state.id].current_price, 2)),
                        "symbol": this.props.tickers.symbol
                    })
    }

    handleSubmit(e){
        e.preventDefault();
        if (Object.keys(this.props.stocks).length > 0){
            let formData = new FormData()
            formData.append('total_price', this.state.total_price)
            formData.append('trans', this.state.trans)
            this.props.createStock(this.state)
            this.props.createTransaction(this.state)
            this.props.updateUserInfo(this.props.session.id.id, formData).then(() => {
                window.alert("Your transaction was safely processed.")
                this.setState({"total_price": 0, "qty": ""});
            }, error => {window.alert("Transaction was unsucessful please try again.")})
        }
        this.props.fetchAllStocks();
    }

    selectTicker(){
        let ticker = "";
        if (Object.keys(this.props.stocks).length > 0){
            ticker = Object.keys(this.props.stocks).map( (stock_id, idx) => {
                const stock = this.props.stocks[stock_id]
                if (stock.shares > 0){
                    return (
                        <option key={`stock-sell${idx}`} className={stock.ticker} value={stock.ticker} id={stock_id}>{stock.ticker}</option>
                    )
                }
                
            })
        }
        return ticker
    }
    
    selectQuantity(){
        let quantity = 0;
        if (this.state.id !== undefined || this.props.stocks[this.state.id] !== undefined){
            quantity = [];
            for (let i = 1; i <= this.props.stocks[this.state.id].shares; i++){
            const option = <option key={`qty-stock-owned-${i}`} value={`${i}`}>{i}</option>
            quantity.push(option)
            }
            
        }
        return quantity
    }

    render () {
        const balance = this.props.user ? this.toFixed(this.props.user.balance, 2) : "";
        const currentPrice = this.props.tickers[this.state.id] !== undefined ? this.toFixed(this.props.tickers[this.state.id].current_price,2) : 0.00.toFixed(2);
        const openPrice = this.props.tickers["open_price"] === null ? this.toFixed(this.props.tickers["previous_price"], 2) : this.toFixed(this.props.tickers["open_price"], 2);
        let change = currentPrice > openPrice ? "green-increase" : "red-decrease";
        change = currentPrice === openPrice ? "gray-neutral" : change;
        change = this.state.ticker === '' ? '' : change;

        return (
            <div className="ticker-container">
            <div className="user-welcome">
                <div className="header-page">Sell Shares (${balance})</div>
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
                        <div className="current-price-text-sell" id={change}>${currentPrice}</div>
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