import React from 'react';

const Team = props => {
	return (
		<div>
			<h3>Teamies:</h3>
			{props.users.map(user => {
				return (
					<div key={user.id}>
						<img src={user.profilePic} alt="profile pic" />
						<h4>{user.fullName}</h4>
					</div>
				);
			})}
		</div>
	);
};

export default Team;
