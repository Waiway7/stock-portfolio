import React from 'react';
import {withRouter, Link} from 'react-router-dom';


class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: true
        }
    }

  

    loginDemoUser(){
        this.props.login({email: "Ditto@gmail.com", password: "ditto!finance"}).then(() => {
           
        })
    }

    header(){
        return (
        
                <div className="header-container">
                    <div className="header">
                    <div className="header-logo">
                        <img className="ditto-logo" src='https://www.nicepng.com/png/full/241-2410054_ditto-costume-jack-septic-eye-pixel-art.png'></img>
                        <div className="header-txt">Ditto!Finance</div>
                    </div>
                    <div className="left-box">
                        <div className="logout-btn" onClick={() => this.loginDemoUser()}>Demo User</div> 
                    </div>
                    </div>
                </div>
    
        )
    }

   

    render(){

        return (
          
            <header>
           
              {this.header()}
           
          </header>
         
        )
    }
}

export default withRouter(Header);