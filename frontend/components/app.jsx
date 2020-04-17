import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SignUp from './form/signup_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Login from './form/login_container';
import Header from './banner/header_container'
import Footer from './footer/footer'
import Landpage from './landpage/landpage_container'


const App = () => {    
    return (
       
        <div className="app">
            {/* <AuthRoute path='/' component={HeaderSign}/> */}
            <Route path='/' component={Header} />
            <Switch>
                <AuthRoute exact path='/' component={SignUp}/>
                <AuthRoute exact path='/login' component={Login}/>
                <ProtectedRoute path='/portfolio' component={Landpage}/>
                <ProtectedRoute path="/transactions" component={Landpage}/>
            </Switch>
            <Footer component={Footer}/>
        </div>
      
    )    
}



export default App;