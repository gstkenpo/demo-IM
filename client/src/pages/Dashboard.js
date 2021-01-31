/* eslint-disable no-mixed-spaces-and-tabs */
import { AppBar, Button, Dialog, DialogContent, DialogTitle, Toolbar } from '@material-ui/core';
import React from 'react';
import LoginPage from './LoginPage';
import SignupPage from './SignUpPage';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLogined: false, loginFailed: false, openLoginPopup: false };
		this.loginHandler = this.loginHandler.bind(this);
	}

	loginHandler(userName, message) {
		if (userName) this.setState({isLogined: true, userName: userName});
		else this.setState({loginFailed: true, message: message});
	}
    handleOpen = () => {
    	this.setState({openLoginPopup: true});
    }
    handleClose = () => {
    	this.setState({openLoginPopup: false});
    };

    render() {
    	return (    
    		<div>
    			{this.state.isLogined ? 
    				<p>Welcome  {this.state.userName}</p> :
    				<div>
    					<AppBar style={{ background: 'transparent', boxShadow: 'none'}}>
    						<Toolbar>
    							<section style={{marginLeft: 'auto', marginRight: -12}}>
    								<h6 style={{color: 'grey'}}>Already have an account?
    									<Button className = 'Login' variant='contained' onClick={this.handleOpen}>Login</Button>
    								</h6>
    							</section>
    						</Toolbar>
    					</AppBar>
    					<Dialog open={this.state.openLoginPopup} onClose={this.handleClose} 
    						aria-labelledby="form-dialog-title">
    						<DialogTitle id="form-dialog-title">Login</DialogTitle>
    						<DialogContent>
    							<LoginPage loginHandler={this.loginHandler}
    								loginFailed={this.state.loginFailed}
    								message = {this.state.message}/>
    						</DialogContent>
    					</Dialog>
    					<SignupPage signUpHandler={this.loginHandler}
    						loginFailed={this.state.loginFailed}
    						message={this.state.message}/>
    				</div>
    			}
    		</div>        
    	);
    }
}

export default Dashboard;
