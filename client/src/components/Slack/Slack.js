import React from 'react';

const Slack = () => (
  <div>
    <a href="https://slack.com/oauth/authorize?scope=incoming-webhook,commands,bot,channels:write&client_id=607645147937.621334967889&redirect_uri=http://localhost:3000/slack/auth/">
      <img
        alt="Add to Slack"
        height="40"
        width="139"
        src="https://platform.slack-edge.com/img/add_to_slack.png"
        srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
      />
      </a>
  </div>
);

export default Slack;