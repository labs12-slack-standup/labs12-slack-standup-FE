import React from "react";

const LandingPage = props => {
	return (
		<div className="onboarding">
			<h3>Hi! Thanks for signing up.</h3>
			<h4>Do you have a join code?</h4>
			<h4>If not, no worries, you can create a team here too</h4>
			<button onClick={props.joinToggle}>I have a join code</button>
			<button onClick={props.createToggle}>Create a Team</button>
		</div>
	);
};

export default LandingPage;
