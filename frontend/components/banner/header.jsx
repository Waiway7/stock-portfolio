import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import HeaderSign from './header_sign_container';



class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            buy: "",
            sell: "",
            portfolio: "",
            transactions: "",
            isLoading: true
        }
    }
    buy(){
        this.props.buy()
    }

    sell(){
        this.props.sell()
    }
    

    isLoaderManage() {
        let x = document.getElementById("loader");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }

    headerContainer(){
        const path = this.props.history.location.pathname;
        const buyLink = <div onClick={() => this.buy()} className="bs-comp">Buy</div>;
        const linkBuy = this.props.bs === "buy" ? <div className="on-site">Buy</div> : buyLink;

        const sellLink = <div onClick={() => this.sell()}className="bs-comp">Sell</div>;
        const linkSell = this.props.bs === "sell" ? <div className="on-site">Sell</div> : sellLink;

        const portLink = <Link style={{ textDecoration: 'none', color: 'black' }} to="/portfolio"><div className="portfolio link-button">Portfolio</div></Link>;
        const linkPort = path.includes("portfolio") ? <div className="on-site">Portfolio</div> : portLink;
        const transLink = <Link style={{ textDecoration: 'none', color: 'black' }} to="/transactions"><div className="transactions link-button">Transactions</div></Link>;
        const linkTrans = path.includes("transactions") ? <div className="on-site">Transactions</div> : transLink;
        if (this.props.loggedIn){
            return (
                <header>
                    <div className="header-container">
                        <div className="header">
                        <div className="header-logo">
                            <img className="ditto-logo" src='https://www.nicepng.com/png/full/241-2410054_ditto-costume-jack-septic-eye-pixel-art.png'></img>
                            <div className="header-txt">Ditto!Finance</div>
                        </div>
                        
                            <div className="link-button-container">
                                {linkBuy}
                                {linkSell}
                                {linkPort}
                                {linkTrans}
                        
                                <div className="logout-btn" onClick={() => this.props.logout()}>Logout</div> 
                               
                            </div>
                        </div>
                    </div>
                </header>
            )
            }
            else {
                return (
                    <HeaderSign />
                )
            }
    }
 
   

    render(){

        return (<header>
           
           {this.headerContainer()}
           
          </header>)
         
       
    }
}

export default withRouter(Header);