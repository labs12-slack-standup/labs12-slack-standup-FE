import React from 'react';

const ResponseTeamList = props => (
  <div className="responders">
    {
      props.responders.map(responder => (
        <img
          src={responder.profilePic}
          alt={responder.fullName}
          onClick={() => {
            const user = props.clickedResponder === responder.userId ? null : responder.userId;
            props.filter(props.clickedDate, user)
          }}
          className="responders-user"
        />
      ))
    }
    
  </div>
)

export default ResponseTeamList;