/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class showCommitDetails extends Component {
  render() {
    const { commitHistory } = this.props.commitHistory;
    // console.log(commitHistory);
    return (
      <React.Fragment>
        <div>
        <h4>Commit Details:</h4>
            {commitHistory.map((commit) => 
                  <div className='commit-message'>
                    {/* <p>SHA: {commit.hash}</p> */}
                    <button onClick={this.props.getSelectedCommit.bind(this, commit.hash)}>SHA: {commit.hash}</button>
                    <p>Message: {commit.message}</p>
                    <p>Author: {commit.author_name}</p>
                    <p>Author Email: {commit.author_email}</p>
                    <p>Timestamp: {commit.date}</p>
                    <p>-----------------------------------------------------------------------------</p>
                  </div>
                )}
            </div>
          </React.Fragment>
          );
  }
}

export default showCommitDetails;
