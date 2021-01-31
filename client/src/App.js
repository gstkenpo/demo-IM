import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { theme } from './themes/theme';



function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/signup" component={SignUpPage} />
				<Route exact path="/login" component={LoginPage} />
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
