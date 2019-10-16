import React, { Component } from 'react';
import Commits from './Commits';
var filePath;
export class CommitHistory extends Component {
  state = {
    branches: [],
    selectedBranch: 'master',
    commits: '',
    filePath: ''
  };
  onChange = async (e) => {
    if (this.props.filePath) {
      const git = require('simple-git')(this.state.filePath);
      await this.setState({ selectedBranch: e.target.value });
      await git.checkout(this.state.selectedBranch).then(() => {
        git.log(async (err, results) => {
          await this.setState({ commits: results.all });
        });
      });
    }
  };
  async componentWillReceiveProps(nextprops) {
    if(this.state.commits===''){
      console.log('comit history is empty for now')
      await this.setState({ filePath: nextprops.filePath, commits:nextprops.history });
    }
    filePath = this.state.filePath;
    const git = require('simple-git')(this.state.filePath);
    git.branchLocal((err, branches) => this.setState({ branches: branches.all }));
  }
  render() {
    const history = this.state.commits;
    const filePath = this.state.filePath;
    if (history[0] === 'Loading data...') {
      return <div>Loading Data</div>;
    } else if (history === 'No commits yet' || filePath === '') {
      return <Commits history={history} />;
    } else {
      return (
        <>
          <div>
            <label>Select Branch</label>

            <select onChange={this.onChange} class="browser-default">
            <option value="" disabled selected>
              Choose your branch
            </option>
              {this.state.branches.map(branch => (
                <option>{branch}</option>
              ))}
            </select>
          </div>
          {history.map(commit => (
            <Commits
              // filePath = {this.state.filePath}
              selectedBranch ={this.state.selectedBranch}
              // displayCommits = {this.displayCommits}
              name={commit.message}
              hash={commit.hash}
              getSelectedCommit={this.props.getSelectedCommit}
            />
          ))}
        </>
      );
    }
}
}

export default CommitHistory;
