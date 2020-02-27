import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SignUp from './form/signup_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Login from './form/login_container';
import Ticker from './ticker/ticker_container'
import Portfolio from './portfolio/portfolio_container'
import Transaction from './transaction/transaction_container'
import Sell from './sell/sell_container'

const App = () => {    
    return (
        <div className="app">
            <div className="header">
                <div className="header-txt">Ditto!Finance</div>
            </div>
            <Switch>
                <AuthRoute exact path='/' component={SignUp}/>
                <AuthRoute exact path='/login' component={Login}/>
                <ProtectedRoute exact path='/ticker' component={Ticker}/>
                <ProtectedRoute exact path='/portfolio' component={Portfolio}/>
                <ProtectedRoute exact path="/transactions" component={Transaction}/>
                <ProtectedRoute exact path="/sell" component={Sell}/>
            </Switch>
           
        </div>
    )    
}



export default App;