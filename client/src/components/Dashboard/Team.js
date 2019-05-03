import React from 'react';

const Team = props => {
	return (
		<div>
			{props.users.map(user => {
				return (
					<div key={user.id}>
						<img src={user.profilePic} alt="profile pic" />
					</div>
				);
			})}
		</div>
	);
};

export default Team;
