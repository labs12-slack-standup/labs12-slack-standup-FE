import Firebase from '../Firebase/Firebase';

import React, { Component } from 'react';

class Login extends Component {

	render() {
		return <Firebase {...this.props} />;
	}
}

export default Login;

// const Login = props => {
//     console.log(props)
// 	return <Firebase {...props} />;
// };

// export default Login;
