import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class Ticker extends React.Component{
    constructor(props){
        super(props)
        this.state = {ticker: "", qty: "", totalPrice: 0, trans: "buy"};
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.fetchStock(this.state.ticker).then( (data) => {
            this.setState({"current_price": data.stock.current_price, "company": data.stock.company, "ticker": data.stock.symbol, qty: "", totalPrice: 0.00})
        })
        // this.setState({"current_price": this.props.tickers.current_price, "company": this.props.tickers.company, "ticker": this.props.tickers.symbol})
    }

    handleBuy(e){
        e.preventDefault();
        if (this.state.error === null){
            let formData = new FormData()
            formData.append('total_price', this.state.totalPrice)
            formData.append('trans', this.state.trans)
            this.props.createStock(this.state)
            this.props.createTransaction(this.state)
            this.props.updateUserInfo(this.props.session.id.id, formData).then(() => {
                this.setState({ticker: "", qty: "", totalPrice: 0})
                window.alert("Your transaction was safely processed.")
            }, error => {window.alert("Transaction was unsucessful please try again.")})
        }
        else {
            this.setState({"error_display": "Invalid Quantity"})
        }
        this.props.fetchOwnStockInfo();
    }

    componentDidMount(){
        this.props.resetErrors()
        this.props.fetchAllStocks();
        
    }

    componentDidUpdate(prevProps){
        if (this.props.tickers !== prevProps.tickers){
            this.setState({"company": this.props.tickers.company, "current_price": this.props.tickers.current_price, "ticker": this.props.tickers.symbol})
        }
    }

    update(field){
        return (e) => this.setState({[field]: e.target.value});
    }
    updateState(){
        return () => this.setState({company: this.props.tickers.company})
    }

    updateTotalPrice(field){
        return (e) => {
                if ((Number.isInteger(Number(e.target.value)))){
                    if (Number(e.target.value < 1)){
                        return this.setState({[field]: e.target.value, "error": "Invalid Quantity"})
                    }
                    else {
                        return this.setState({ [field]: e.target.value, "totalPrice": this.toFixed((Number(e.target.value) * this.props.tickers["current_price"]), 2), "error": null});
                    }
                }
                else{
                    return this.setState({[field]: e.target.value, "error": "Invalid Quantity"})
                }
        
        }
    }
    clearQtyErrors(){
        this.setState({"error_display": undefined})
    }

    clearErrors(){
        this.props.resetErrors()
    }

    toFixed(number, decimals) {
        var x = Math.pow(10, Number(decimals) + 1);
        return (Number(number) + (1 / x)).toFixed(decimals)
    }

    tickerContainer(){
        const openPrice = this.props.tickers["open_price"] === null ? this.toFixed(this.props.tickers["previous_price"], 2) : this.toFixed(this.props.tickers["open_price"], 2);
        const priceTitle = this.props.tickers["open_price"] !== null ? "Open Price (USD)" : "Previous Close Price (USD)";
        const currentPrice = this.toFixed(this.props.tickers["current_price"], 2);
        let change = currentPrice > openPrice ? "green-increase" : "red-decrease";
        change = currentPrice === openPrice ? "gray-neutral" : change;
        const toolTipError = this.state.error_display !== undefined ? "error_display" : "";
        const error = this.state.error_display !== undefined ? "ticker-text-input qty-input error-qty" : "ticker-text-input qty-input"
        return <div className="ticker-info-container">
                    <div className="ticker-text-container">
                        <div className="ticker-text text-quote">Symbol</div>
                        <div className="ticker-symbol text-quote">{this.props.tickers.symbol}</div>
                    </div>
                    <div className="ticker-text-container">
                        <div className="ticker-text text-quote">Company</div>
                        <div className="ticker-symbol text-quote">{this.props.tickers.company}</div>
                    </div>
                    <div className="current-price-container">
                        <div className="current-price-text text-quote">Current Price (USD)</div>
                        <div className="current-price-number text-quote" id={change}>${currentPrice}</div>
                    </div>
                    <div className="open-price-container">
                        <div className="open-price-text text-quote">{priceTitle}</div>
                        <div className="open-price-number text-quote">${openPrice}</div>
                    </div>
                    <div className="qty-container">
                        <div className="qty-text">Quantity</div>
                        <div className="input-qty-container">
                        <input type="integer" 
                            className={error}
                            value={this.state.qty} 
                            placeholder="0"
                            onChange={this.updateTotalPrice('qty')}
                            onClick={this.clearQtyErrors.bind(this)}>
                        </input>
                        <div className={toolTipError}>{this.state.error_display}</div>
                        </div>
                    </div>
                    <div className="total-price-container">
                        <div className="total-price-text text-quote">Total Price (USD)</div>
                        <div className="total-price-number text-quote">${this.state.totalPrice}</div>
                    </div>
                    <form className="buy-stock" onSubmit={this.handleBuy.bind(this)}>
                        <input className="submit-tickers" type="submit" value="Buy"></input>
                    </form>
                </div>
    }

    render() {
        const lengthError = Object.keys(this.props.error).length
        const tickerError = lengthError > 0 && this.props.error.responseJSON['error'] ? "ticker-text-input error-ticker" : "ticker-text-input";
        const toolTipError = lengthError > 0 && this.props.error.responseJSON['error'] ? "error_display_ticker" : "";
        const errorDisplay = lengthError > 0 && this.props.error.responseJSON['error']  ? this.props.error.responseJSON['error'] : "";


        const balance = this.props.user ? this.toFixed(this.props.user.balance, 2) : "";
        const tickerContainer = this.props.tickers["symbol"] !== undefined ? this.tickerContainer() : "";
        return(
            
            <div className="ticker-container">
                <div className="user-welcome">
                    <div className="header-page">Buy Shares (${balance})</div>
                </div>
        
                <div className="ticker-form-container">
                <form className="ticker-form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="search-for-quote">Search For a Quote</div>
                    <div className="ticker-input-field">
                        <input type="text" 
                            className={tickerError}
                            value={this.state.ticker} 
                            placeholder="Add Ticker Here"
                            onChange={this.update('ticker')}
                            onClick={this.props.resetErrors}
                            >
                        </input>
                        <div className={toolTipError}>{errorDisplay}</div>
                        <input className="submit-tickers" type="submit" value="Find Quote"></input>
                    </div>
                </form>
                </div>
                {tickerContainer}
            </div>
            
        )
    }
}

export default withRouter(Ticker);