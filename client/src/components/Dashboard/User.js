import React from 'react';
import { Card, Button, Elevation } from '@blueprintjs/core';

const User = props => {
	return (
		<div>
			<Card interactive={true} elevation={Elevation.TWO} key={props.user.id}>
				<img src={props.user.profilePic} alt="profile pic" />
				<h4>{props.user.fullName}</h4>
				{props.user.active ? (
					<Button onClick={()=>props.deactivateUser(props.user.id)}>
						Deactivate User
					</Button>
				) : (
					<Button onClick={()=>props.activateUser(props.user.id)}>
						Activate User
					</Button>
				)}
			</Card>
		</div>
	);
};

export default User;
