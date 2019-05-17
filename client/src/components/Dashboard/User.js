import React from 'react';
import { Card, Button, Elevation } from '@blueprintjs/core';

const User = props => {
	return (
		<div className="singleUserContainer">
			<div
				// className="userdiv"
				interactive={true}
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
						className="deactivate"
						onClick={() => props.deactivateUser(props.user.id)}
					>
						Deactivate User
					</Button>
				) : (
					<Button onClick={() => props.activateUser(props.user.id)}>
						Activate User
					</Button>
				)}
			</div>
		</div>
	);
};

export default User;
