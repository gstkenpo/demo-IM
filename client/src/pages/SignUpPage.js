/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, FormControl, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import bgImg from '../images/bgImg.png';
import '../SignUp.css';
  
const SignupPage = (props) => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const signupHandler = () => {
		fetch('rest/user', {
			method: 'POST',
			body: JSON.stringify({
				userName: userName,
				password: password,
				email: email,
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
						props.signupHandler(data.userName, 'Login Succeed');
					});
				});
			}
		});
	};
    
	return (
		<div className="SignUpPage">
			<img className="SidImage" src={bgImg}></img>
			<Button variant='contained' color="primary">Login</Button>
			<FormControl className="SignUpForm">
				{
					props.loginFailed ? 
						<Alert severity="error">{props.message}</Alert> : null
				}
				<h2>Create an account.</h2>
				<TextField
					label={'Username'}
					onChange={e => setUserName(e.target.value)}
					value={userName}
				/>
				<br/>
				<TextField
					label={'E-mail address'}
					onChange={e => setEmail(e.target.value)}
				/>
				<br/>
				<TextField
					label={'Password'}
					type="password"
					onChange={e => setPassword(e.target.value)}
				/>
				<br/>
				<Button className = "Create" variant='contained' color="primary" onClick={signupHandler}>Create</Button>
			</FormControl>
		</div>
	);
};

export default (SignupPage);