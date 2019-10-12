/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class showRepoDetails extends Component {
  state = {
  };


  render() {
    return (
      <React.Fragment>
        <div id='repo-details' className={`${this.props.repoDetailsDisplayClass}`}>
            <h1>Repository Details</h1>
            <h6>Show changed files, commit history, commit messages, etc...</h6>
        </div>
      </React.Fragment>
    );
  }
}

export default showRepoDetails;