/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, FormControl, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';

const LoginPage = (props) => {
	const button = {
		padding: '10px 20px',
		border: 'none',
		borderRadius: '4px',
		background: '#fff',
		color: '#3A8DFF',
		fontSize: '14px',
		cursor: 'pointer',
		transition: '.3s background',
		'&:hover': {
			background: '#3A8DFF'
		}
	};
      
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const loginHandler = () => {
		console.log('userName: ' + userName);
		console.log('password: ' + password);
		fetch('rest/login', {
			method: 'POST',
			body: JSON.stringify({
				userName: userName,
				password: password
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
						props.loginHandler(data.userName, 'Login Succeed');
					});
				});
			} else {
				res.json().then(data => {
					props.loginHandler(null, data.error.message);//loginFailed
				});
			}
		});
	};
    
	return (
		<div>
			<FormControl>
				{
					props.loginFailed ? 
						<Alert severity="error">{props.message}</Alert> : null
				}
				<TextField
					label={'User Name'}
					onChange={e => setUserName(e.target.value)}
					value={userName}
				/>
				<TextField
					label={'Password'}
					type="password"
					onChange={e => setPassword(e.target.value)}
				/>
				<br/>
				<Button variant='contained' color="primary" onClick={loginHandler}>Login</Button>
			</FormControl>
		</div>
	);
};

export default (LoginPage);