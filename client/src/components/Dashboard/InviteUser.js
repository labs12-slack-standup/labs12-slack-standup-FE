import React from 'react';

const InviteUser = props => {
	return (
		<div>
			<h3>Invite a new user to your team here:</h3>
			<form onSubmit={props.addUser}>
				<input
					type="email"
					placeholder="New user's email here"
					onChange={props.changeHandler}
					name="newMemberEmail"
				/>
				<button>Invite User</button>
			</form>
		</div>
	);
};

export default InviteUser;
