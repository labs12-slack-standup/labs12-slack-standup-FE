import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';

class SlackRedirect extends Component {
  render() {
    return (
      <div>Authorising User</div>
    )
  }

  componentDidMount() {
    const endpoint = `${baseURL}/auth/slack/${this.props.location.search}`;
    axiosWithAuth()
      .get(endpoint)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        console.log(this.props.history)
        this.props.history.goBack();
      })
      .catch(err => console.log(err));
  }
}

export default SlackRedirect;