/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AppBar, Button, FormControl, TextField, Toolbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import bgImg from '../images/bgImg.png';
import '../Login.css';

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {userName: '', password: ''};
	}

	loginHandler = () => {
		this.setState({message: ''});
		fetch('rest/login', {
			method: 'POST',
			body: JSON.stringify({
				userName: this.state.userName,
				password: this.state.password
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).then(res => {
			console.log('POST STATUS: '+ res.status);
			if (res.status == 200){
				// eslint-disable-next-line react/prop-types
				fetch('rest/user', {
					method: 'GET'
				}).then(res => {
					console.log('GET STATUS: '+ res.status);
					res.json().then((data) => {
						this.props.history.push('/');
					});
				});
			} else {
				res.json().then(data => {
					this.setState({message: data.error.message});
				});
			}
		});
	};
    
	render() {
		return (
			<div>
				{this.state.isSucceed ? 
					<Redirect to={{
						pathname: '/'
					}}/> :
					<div className="LoginPage">
						<AppBar style={{ background: 'transparent', boxShadow: 'none'}}>
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
						<FormControl className="LoginForm">
							{
								this.state.message ? 
									<Alert severity="error">{this.state.message}</Alert> : null
							}
							<TextField
								label={'User Name'}
								onChange={e => this.setState({userName: e.target.value})}
								value={this.state.userName}
							/>
							<TextField
								label={'Password'}
								type="password"
								onChange={e => this.setState({password: e.target.value})}
							/>
							<br/>
							<Button variant='contained' color="primary" onClick={this.loginHandler} className='Login'>Login</Button>
						</FormControl>
					</div>
				}
			</div>
		);
	}
}

export default (LoginPage);