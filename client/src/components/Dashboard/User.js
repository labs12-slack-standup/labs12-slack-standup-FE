import React from 'react';
import jwt_decode from 'jwt-decode';

import { Button } from '@material-ui/core';
import './dashboard.css';

const User = props => {
	const token = jwt_decode(localStorage.getItem('token'));
	return (
		<div className="singleUserContainer">
			<div key={props.user.id}>
				<img
					src={props.user.profilePic}
					className="profilePic"
					alt="profile pic"
				/>
				<h4>{props.user.fullName}</h4>
				<Button
					variant="outlined"
					id={
						token.roles === 'member' || token.subject === props.user.id
							? 'display-button'
							: 'activateButton'
					}
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
