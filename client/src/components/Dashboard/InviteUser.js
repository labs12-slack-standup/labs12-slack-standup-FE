import React from 'react';
import { Button, TextArea, Intent} from '@blueprintjs/core';

const InviteUser = props => {
	return (
		<div>
			<h3>Invite a new user to your team here:</h3>
			<form onSubmit={props.addUser}>
				<TextArea
					
					placeholder="New user email here"
					onChange={props.changeHandler}
					
				/>
				{/* <input
					type="email"
					placeholder="New user email here"
					onChange={props.changeHandler}
					name="newMemberEmail"
				/> */}
				<Button>Invite User</Button>
			</form>
		</div>
	);
};

export default InviteUser;
