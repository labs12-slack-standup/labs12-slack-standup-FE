import React from 'react';
import { Button, Elevation } from '@blueprintjs/core';
import jwt_decode from 'jwt-decode';

const User = props => {
	const token = jwt_decode(localStorage.getItem('token'));
	console.log(token);
	return (
		<div className="singleUserContainer">
			<div
				// className="userdiv"
				interactive={false}
				elevation={Elevation.TWO}
				key={props.user.id}
			>
				<img
					src={props.user.profilePic}
					className="profilePic"
					alt="profile pic"
				/>
				<h4>{props.user.fullName}</h4>
				<br />
				{props.user.active ? (
					<Button
						className={
							token.roles === 'admin' ? 'activateButton' : 'bp3-disabled'
						}
						onClick={() => props.deactivateUser(props.user.id)}
					>
						Deactivate User
					</Button>
				) : (
					<Button
						className={
							token.roles === 'admin' ? 'activateButton' : 'bp3-disabled'
						}
						onClick={() => props.activateUser(props.user.id)}
					>
						Activate User
					</Button>
				)}
			</div>
		</div>
	);
};

export default User;
