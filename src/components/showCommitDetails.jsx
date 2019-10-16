/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component, Fragment } from 'react';

class showCommitDetails extends Component {
  state = {
    branches: [],
    selectedBranch:[],
    commits: this.props.commitHistory.commitHistory
  };
  onChange = (e) => {
    
    // console.log(branch)
    const git = require('simple-git')(this.props.filePath);
    this.setState({ selectedBranch: [e.target.value] });
    git
      .log((err, results) => results)
      .log('origin', this.state.selectedBranch, (err, res) => this.setState({commits:res.all}) );
  };
   componentDidMount() {
    const git = require('simple-git')(this.props.filePath);
    git.branchLocal((err, branches) => {
        this.setState({ branches: branches.all
      })
    });
  }

  render() {
    const commitHistory = this.state.commits;
    console.log(commitHistory);
    return (
      // <Fragment>
        <div>
          <label>Select Branch</label>
          <select onChange = {this.onChange}class="browser-default">
              {this.state.branches.map(branch => (<option>{branch}</option>))}
          </select>
        <div>
          <h4>Commit Details:</h4>
          {commitHistory.map(commit => (
            <div className="commit-message">
              {/* <p>SHA: {commit.hash}</p> */}
              <button onClick={this.props.getSelectedCommit.bind(this, commit.hash)}>
                SHA: 
{' '}
{commit.hash}
              </button>
              <p>
Message:
{' '}
{commit.message}
</p>
              <p>
Author:
{' '}
{commit.author_name}
</p>
              <p>
Author Email:
{' '}
{commit.author_email}
</p>
              <p>
Timestamp:
{' '}
{commit.date}
</p>
              <p>-----------------------------------------------------------------------------</p>
            </div>
          ))}
        </div>
        )
      </div>
      // {/* </Fragment> */}
    );
  }
}
export default showCommitDetails;
