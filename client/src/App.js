import { MuiThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import { theme } from './themes/theme';



function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<Route exact path="/" component={Dashboard} />
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
