import React from 'react';
import { slackURL } from '../../config/axiosWithAuth';

// const Slack = () => (
// 	<div>
// 		<h3>Deliver your daily standup to your team's Slack</h3>
// 		<a
// 			href={`https://slack.com/oauth/authorize?scope=incoming-webhook,commands,bot,channels:write&client_id=607645147937.621334967889&redirect_uri=${slackURL}`}
// 		>
// 			<img
// 				alt="Add to Slack"
// 				height="40"
// 				width="139"
// 				src="https://platform.slack-edge.com/img/add_to_slack.png"
// 				srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
// 			/>
// 		</a>
// 	</div>
// );

const Slack = props => {
	
	return (

		<div>
		<h3>{!props.slackTest ? 'Deliver your daily standup to your team on Slack':'Your Slack integration has been set up. Click the button below if you would like to edit your settings (even though it says Add).'}</h3>
		<a
			href={`https://slack.com/oauth/authorize?scope=incoming-webhook,commands,bot,channels:write&client_id=607645147937.621334967889&redirect_uri=${slackURL}`}
		>
			<img
				alt={!props.slackTest ? 'Edit your Settings' : "Add to Slack"}
				height="40"
				width="139"
				src="https://platform.slack-edge.com/img/add_to_slack.png"
				srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
			/>
		</a>
	</div>
	)
}


export default Slack;
