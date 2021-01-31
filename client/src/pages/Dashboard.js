/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import SignupPage from './SignUpPage';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLogined: false, loginFailed: false };
		this.loginHandler = this.loginHandler.bind(this);
	}

	loginHandler(userName, message) {
		if (userName) this.setState({isLogined: true, userName: userName});
		else this.setState({loginFailed: true, message: message});
	}

	render() {
    	return (    
    		<div>
    			{this.state.isLogined ? 
    				<p>Welcome  {this.state.userName}</p> :
    				<SignupPage loginHandler={this.loginHandler}
						loginFailed={this.state.loginFailed}
						message={this.state.message}/>
    			}
    		</div>        
    	);
	}
}

export default Dashboard;
