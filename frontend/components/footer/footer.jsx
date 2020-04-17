import React from 'react';
import {Link} from 'react-router-dom'



class Header extends React.Component{
    constructor(props){
        super(props)
    }



    render(){
    

        return (
            <footer>
                <div className="footer-container">
                    <div className="footer">
                    <div className="footer-logo">
                        <div className="footer-txt">Powered By Rails and React Redux | Financial Data Provided By 
                           <a href="https://iexcloud.io/docs/api/#introduction" target="_blank" className="tab-link" textDecoration="none"> IEX SandBox API</a>
                        </div>
                    </div>
                    <div className="outer-links">
                            <a textDecoration="none" target="_blank" href="https://github.com/Waiway7/CloudNine" className="target-link"><i className="fab fa-github github"></i></a>
                            <a textDecoration="none" target="_blank" href="https://linkedin.com/in/wai-chun-chan-718035117/" className="target-link"><i className="fab fa-linkedin github"></i></a>
                            <a textDecoration="none" target="_blank" href="https://angel.co/wai-c-chan" className="target-link"><i className="fab fa-angellist github"></i></a>
                            <a textDecoration="none" target="_blank" href="https://waiway7.github.io/" className="target-link"> <i className="fas fa-briefcase"></i></a>

                    </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Header;