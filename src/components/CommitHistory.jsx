import React, { Component } from 'react';
import Commits from './Commits';

export class CommitHistory extends Component {
  render() {
    const { history } = this.props;
    console.log(history);
    if (history === 'No commits yet') {
      return <Commits history={history} />;
    }
    return (
      <>
        {history.map(commit => (
          <Commits
            name={commit.message}
            hash={commit.hash}
            getSelectedCommit={this.props.getSelectedCommit}
          />
        ))}
      </>
    );
  }
}

export default CommitHistory;
