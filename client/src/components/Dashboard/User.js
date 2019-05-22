import React from 'react';
import { Button } from '@material-ui/core';
import jwt_decode from 'jwt-decode';

import './dashboard.css';

const User = props => {
	const token = jwt_decode(localStorage.getItem('token'));
	return (
		<div className="singleUserContainer">
			<div
				// className="userdiv"
				key={props.user.id}
			>
				<img
					src={props.user.profilePic}
					className="profilePic"
					alt="profile pic"
				/>
				<h4>{props.user.fullName}</h4>
				<Button
					variant="outlined"
					id={token.roles === 'admin' ? 'activateButton' : 'display-button'}
					onClick={() => props.deactivateUser(props.user.id)}
					style={{ padding: '0 8px', marginTop: '4px' }}
				>
					Deactivate
				</Button>
			</div>
		</div>
	);
};

export default User;
