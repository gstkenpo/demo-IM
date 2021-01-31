/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AppBar, Button, FormControl, TextField, Toolbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import bgImg from '../images/bgImg.png';
import '../SignUp.css';
  
class SignupPage extends Component {
	constructor(props){
		super(props);
		this.state = {userName:'', password: '', email: '', confirmPassword: '',
			userNameErr: null, passwordErr: null, emailErr: null, isSucceed: false};
	}

	signUpHandler = () => {
		fetch('rest/user', {
			method: 'POST',
			body: JSON.stringify({
				userName: this.state.userName,
				password: this.state.password,
				email: this.state.email,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).then(res => {
			console.log('POST STATUS: '+ res.status);
			if (res.status == 201){
				// eslint-disable-next-line react/prop-types
				this.setState({isSucceed: true});
			} else {
				this.setState({message: 'Sign Up Failed'});
				res.json().then(data => {
					this.setState({userNameErr: this.retrieveErrorMessage(data.errors, 'userName')});
					this.setState({emailErr: this.retrieveErrorMessage(data.errors, 'email')});
					this.setState({passwordErr: this.retrieveErrorMessage(data.errors, 'password')});
				});
			}
		});
	};

	retrieveErrorMessage(data, fieldName){
		let errMsgs = '';
		for (let i = 0; i < data.length; i++) {
			if(data[i].param === fieldName){
				console.log(data[i].msg);
				errMsgs += data[i].msg + ' \n ';
			}
		}
		return errMsgs;
	}

	routeLogin = () => {
		console.log('route Loginx');
		this.props.history.push('/login');
	};
	
	render() {
		return (
			<div>
				{this.state.isSucceed ? 
					<Redirect to={{
						pathname: '/'
					}}/> :
					<div className="SignUpPage">
						<AppBar className = 'AppBar' style={{ background: 'transparent', boxShadow: 'none'}}>
							<Toolbar>
								<section style={{marginLeft: 'auto', marginRight: -12}}>
									<h6 style={{color: 'grey'}}>Already have an account?
										<Button className = 'Login' 
											variant='contained' 
											style={{backgroundColor: '#ffffff'}}
											onClick={this.routeLogin}>Login</Button>
									</h6>
								</section>
							</Toolbar>
						</AppBar>
						<img className="SidImage" src={bgImg}></img>
				
						<FormControl className="SignUpForm">
							{
								this.state.message ? 
									<Alert severity="error">{this.state.message}</Alert> : null
							}
							<h2>Create an account.</h2>
							<TextField
								label={'Username'}
								onChange={e => this.setState({userName: e.target.value})}
								value={this.state.userName}
								error={this.state.userNameErr ? true : false}
								helperText={this.state.userNameErr}
							/>
							<br/>
							<TextField
								label={'E-mail address'}
								onChange={e => this.setState({email: e.target.value})}
								error={this.state.emailErr ? true : false}
								helperText={this.state.emailErr}
							/>
							<br/>
							<TextField
								label={'Password'}
								type="password"
								onChange={e => this.setState({password: e.target.value})}
								error={this.state.passwordErr ? true : false}
								helperText={this.state.passwordErr}
							/>
							<br/>
							<TextField
								label={'Confirm Password'}
								type="password"
								onChange={e => this.setState({confirmPassword: e.target.value})}
							/>
							<br/>
							<Button className = "Create" variant='contained' color="primary" onClick={this.signUpHandler}>Create</Button>
						</FormControl>
					</div>
				}
			</div>
		);
	}
}

export default (SignupPage);