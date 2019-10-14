/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class showCommitDetails extends Component {
  render() {
    const { commitHistory } = this.props.commitHistory;
    // console.log(commitHistory);
    return (
      <>
        <div>
          <h4>Commit Details:</h4>
          {commitHistory.map(commit => (
            <div className="commit-message">
              {/* <p>SHA: {commit.hash}</p> */}
              <button onClick={this.props.getSelectedCommit.bind(this, commit.hash)}>
                SHA: {commit.hash}
              </button>
              <p>Message: {commit.message}</p>
              <p>Author: {commit.author_name}</p>
              <p>Author Email: {commit.author_email}</p>
              <p>Timestamp: {commit.date}</p>
              <p>-----------------------------------------------------------------------------</p>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default showCommitDetails;
