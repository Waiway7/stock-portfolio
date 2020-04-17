import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import Portfolio from '../portfolio/portfolio_container'
import Ticker from '../ticker/ticker_container'
import Transaction from '../transaction/transaction_container'
import Sell from '../sell/sell_container'

class Landpage extends React.Component {
    constructor(props){
        super(props)
       
    }

    TPComponent(){
        const path = this.props.history.location.pathname;
        if (path.includes("portfolio")){
            return <Portfolio />
        }
        else if (path.includes("transactions")){
            return <Transaction />
        }
    }

    BSComponent(){
        if (this.props.bs === "buy"){
            return <Ticker />
        }
        else if (this.props.bs === "sell"){
            return <Sell />
        }
    }
    
    render(){
        
        return(
            
            <div className="landpage-container">
                <div className="content-container">
                        {this.TPComponent()}
                        {this.BSComponent()}
                </div>
            </div>
        )
    }
}

export default withRouter(Landpage)