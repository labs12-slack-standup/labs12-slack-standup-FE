import React from 'react';

const Team = props => {
	return (
		<div>
			{props.users.map(user => {
				return (
					<div>
						<img src={user.profilePic} />
					</div>
				);
			})}
		</div>
	);
};

export default Team;
