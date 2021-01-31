/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {userName: ''};
		// this.loginHandler = this.loginHandler.bind(this);
	}
    
	componentDidMount(){
		fetch('rest/user', {
			method: 'GET'
		}).then(res => {
			console.log('GET STATUS: '+ res.status);
			if (res.status == 200) {
				res.json().then((data) => {
					this.setState({userName: data.userName});
				});
			} else {
				// eslint-disable-next-line react/prop-types
				this.props.history.push('/signup');
			}
		});
	}

	render() {
    	return (    
    		<div>
				<p>Welcome  {this.state.userName}</p>
    		</div>        
    	);
	}
}

export default Dashboard;
