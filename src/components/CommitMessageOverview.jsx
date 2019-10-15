/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export class CommitMessageOverview extends Component {
  render() {
    const commit = this.props.selectedCommit[0];

    if (commit === 'Loading data...') {
      return <div />;
    }
    return (
      <div>
        <div className="commit-message-title">{commit.message}</div>
        <div className="commit-sub-details">
          <div className="commit-author">
            <i className="material-icons">comment</i>
            {commit.author_name}
          </div>
          <div className="commit-sha">
            <i className="material-icons">link</i>
            {commit.hash.slice(0, 7)}
          </div>
          <div className="commit-time-stamp">
            <i className="material-icons">access_time</i>
            {commit.date}
          </div>
        </div>
      </div>
    );
  }
}

export default CommitMessageOverview;
