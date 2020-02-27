import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {   
                        username: '', 
                        password: '',
                    }
    }

    update(field){
        return (e) => this.setState({[field]: e.target.value});
    }

    componentDidUpdate(prevProps){
        if (this.props.errors !== prevProps.errors){
            const {errors} = this.props;

            this.setState({errors: errors[0]})
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.userForm(this.state)
    }

    clearErrors(){
        this.props.resetErrors();
    }

    clearPasswordError(){
        this.setState({errorPassword: undefined})
    }

    clearError(){
        this.setState({errors: undefined})
    }

    loginInput(){
        const error = this.state.errors !== undefined ? "signup-input error-signup error-email" : "signup-input";
        const toolTipError = this.state.errors !== undefined ? "error" : "";
       
        return( 
                <div className="session-form">
                    <form className="signup-container" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="session-header">Login Into Ditto</div>
                    <div className="input-container">
                        <input type="text"
                            value={this.state.email}
                            placeholder="Your email address"
                            onChange={this.update('email')}
                            className={error}
                            onClick={this.clearError.bind(this)}
                        />
                    <div className={toolTipError}>{this.state.errors}</div>
                    </div>
                   
                    <div className="input-container">
                    <input type="password" 
                        value={this.state.password}
                        onChange={this.update('password')}
                        placeholder="Your Password"
                        className={error}
                        onClick={this.clearError.bind(this)}
                    />
                    <div className={toolTipError}>{this.state.errors}</div>
                    </div>
                    <div className="input-container">
                    <input className="submit-form" type="submit" value="Log In"/>
                    </div>
                    <div className="login-link-container">
                        <div className="link-center">
                        <div className="login-text">Don't Have an Account? </div>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
                            <div className="login-link">Signup now</div>
                        </Link>
                        </div>
                    </div>
                    </form>
                </div>
        )
    }
    

    render(){
       return(
            <div className='form-container'>
                {this.loginInput()}
            </div>
        )
    }       
}

export default withRouter(Login);