import React from 'react';
import {withRouter, Link} from 'react-router-dom';

class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {  email: '', 
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
            let errorEmail, errorUsername, errorPassword;
            errors.forEach((error) => {
                if (error.includes("Email")) {errorEmail = error}
                else if (error.includes("Username")) {errorUsername = error}
                else if (error.includes("Password")) {errorPassword = error}
            })
            this.setState({errorEmail,errorUsername, errorPassword})
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.userForm(this.state)
    }

    clearErrors(){
        this.props.resetErrors();
    }

    clearUserError(){
        this.setState({errorUsername: undefined})
    }

    clearPasswordError(){
        this.setState({errorPassword: undefined})
    }

    clearEmailError(){
        this.setState({errorEmail: undefined})
    }

    signupInput(){
        const email = this.state.errorEmail !== undefined ? "signup-input error-signup error-email" : "signup-input";
        const triggerEmail = this.state.errorEmail !== undefined ? "error" : "";
        const username = this.state.errorUsername !== undefined ? "signup-input error-signup" : "signup-input";
        const triggerUsername = this.state.errorUsername !== undefined ? "error" : "";
        const password = this.state.errorPassword !== undefined ? "signup-input error-signup" : "signup-input";
        const triggerPassword = this.state.errorPassword !== undefined ? "error" : "";
       
        return( 
                <div className="session-form">
                    <form className="signup-container" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="session-header">Create a New Account</div>
                    <div className="input-container">
                        <input type="text"
                            value={this.state.email}
                            placeholder="Your email address"
                            onChange={this.update('email')}
                            className={email}
                            onClick={this.clearEmailError.bind(this)}
                        />
                    <div className={triggerEmail}>{this.state.errorEmail}</div>
                    </div>
                    <div className="input-container">
                    <input type="text"
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.update('username')}
                        className={username}
                        onClick={this.clearUserError.bind(this)}
                    />
                    <div className={triggerUsername}>{this.state.errorUsername}</div>
                    </div>
                    <div className="input-container">
                    <input type="password" 
                        value={this.state.password}
                        onChange={this.update('password')}
                        placeholder="Your Password"
                        className={password}
                        onClick={this.clearPasswordError.bind(this)}
                    />
                    <div className={triggerPassword}>{this.state.errorPassword}</div>
                    </div>
                    <div className="input-container">
                    <input className="submit-form" type="submit" value={this.props.formType}/>
                                        </div>
                    <div className="login-link-container">
                        <div className="link-center">
                        <div className="login-text">Have an Account? </div>
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/login">
                            <div className="login-link">Login Here</div>
                        </Link>
                        </div>
                    </div>
                    </form>

                </div>
        )
    }
    

    render(){
       return(
           <div className="landpage-container">
            <div className="content-container">
                {this.signupInput()}
            </div>
            
            </div>
        )
    }       
}

export default withRouter(SignUp);