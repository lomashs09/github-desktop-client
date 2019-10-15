/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';

class showCommitDetails extends Component {
  state = {
    branches: [],
    commits: this.props.commitHistory.commitHistory
  };
  onChange = branch => {
    const git = require('simple-git')(this.props.filePath);
    this.setState({ branches: [branch] });
    git
      .log((err, results) => results)
      .log('origin', branch, (err, res) =>this.setState({commits:res}) );
  };
   componentDidMount() {
    const git = require('simple-git')(this.props.filePath);
    git.branchLocal((err, branches) => {
        this.setState({ branches: branches.all
      })
    });
  }

  render() {
    console.log(this.state.branches);
    const commitHistory = this.state.commits;
    return (
      // <Fragment>
      <div>
        <div>
          <label>Select Branch</label>
          <select class="browser-default">
              {this.state.branches.map(branch => (<option onChange={this.onChange}>{branch}</option>))}
          </select>
          <h4>Commit Details:</h4>
          {commitHistory.map(commit => (
            <div className="commit-message">
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
      </div>
      // {/* </Fragment> */}
    );
  }
}
export default showCommitDetails;
