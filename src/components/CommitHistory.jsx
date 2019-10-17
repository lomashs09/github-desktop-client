import React, { Component } from 'react';
import Commits from './Commits';
var filePath;
export class CommitHistory extends Component {
  state = {
    toggle: true,
    branches: [],
    selectedBranch: 'master',
    commits: '',
    filePath: ''
  };

  onChange = async (e, changedBranch) => {
    if (changedBranch) {
      if (this.props.filePath) {
        const git = require('simple-git')(this.state.filePath);
        await this.setState({ selectedBranch: changedBranch });
        await git.checkout(this.state.selectedBranch).then(() => {
          git.log(async (err, results) => {
            await this.setState({ commits: results.all });
          });
        });
      }
    } else {
      if (this.props.filePath) {
        const git = require('simple-git')(this.state.filePath);
        await this.setState({ selectedBranch: e.target.value });
        await git.checkout(this.state.selectedBranch).then(() => {
          git.log(async (err, results) => {
            await this.setState({ commits: results.all });
          });
        });
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedBranch !== prevProps.selectedBranch) {
      this.onChange(this, this.props.selectedBranch);
    }
  }

  componentDidMount() {
    if (this.state.commits === '') {
      this.setState({ filePath: this.props.filePath, commits: this.props.history });
      filePath = this.props.filePath;
      const git = require('simple-git')(filePath);
      git.branchLocal((err, branches) => this.setState({ branches: branches.all }));
    }
  }

  componentWillReceiveProps(nextprops) {
    if (this.state.commits === '') {
      this.setState({ filePath: nextprops.filePath, commits: nextprops.history });
      filePath = this.state.filePath;
    }
    const git = require('simple-git')(this.state.filePath);
    git.branchLocal((err, branches) => this.setState({ branches: branches.all }));
  }

  render() {
    if (this.props.selectedBranch || this.state.filePath === '') {
      const history = this.state.commits;
      const filePath = this.state.filePath;
      if (history[0] === 'Loading data...' || this.state.filePath === '') {
        return (
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div>
              <div class="gap-patch">
                <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        );
      } else if (history === 'No commits yet' || filePath === '') {
        return <Commits history={history} />;
      } else {
        return (
          <>
            <div>
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
                selectedBranch={this.state.selectedBranch}
                name={commit.message}
                hash={commit.hash}
                getSelectedCommit={this.props.getSelectedCommit}
              />
            ))}
          </>
        );
      }
    } else {
      const history = this.state.commits;
      const filePath = this.state.filePath;

      if (history[0] === 'Loading data...') {
        console.log('');
        return <div>Loading Data</div>;
      } else if (history === 'No commits yet' || filePath === '') {
        return <Commits history={history} />;
      } else {
        return (
          <>
            <div>
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
                onChange={this.onChange}
                selectedBranch={this.state.selectedBranch}
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
}

export default CommitHistory;
