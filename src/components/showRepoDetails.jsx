/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import ShowCommitDetails from './showCommitDetails';
import ShowFileChanges from './showFileChanges';


class showRepoDetails extends Component {
    
    state = {
    commitHistory: ['Loading data'],
    changedFiles : ['Loading data']
  };

  getSelectedCommit = (commitHash) => {
    // console.log(commitHash);
    const git = require('simple-git')(this.props.addNewRepoFilePath);
    git.raw(['show', commitHash], (err,result) => this.setState({ changedFiles: [result] }));
  }

 async componentDidMount() {
  const git = require('simple-git')(this.props.addNewRepoFilePath)
//   console.log('Clonning a Repo')
//   console.log(this.props.repoToClone)
//   git.silent(true)
//   .clone(this.props.repoToCloneUrl)
//   .then(() => console.log('finished'))
  
    // git.diffSummary((err, diffSummary) => console.log(diffSummary));
    // git.diff((err, diff) => console.log(diff));

    git.branch((err,branches) => console.log(branches));

    git.status((err, status) => console.log(status));

    // git.log((err, log) => log.all.map((commit) => console.log(commit.hash)))


  git.log((err, log) => this.setState({
      commitHistory: [...log.all.map((commit) => commit)],
    //   selectedCommit: [log.all[0].hash]
    }))
    // git.log((err, log) => log.all.map((commit) => git.raw(['show', commit.hash], (err, result) => this.setState({changedFiles: this.state.changedFiles.push(result)}))))
    // // git.raw(['show',])
}
  render() {
    if(this.state.commitHistory[0] === 'Loading data') {
        return (
            <React.Fragment>
                <p>{this.state.commitHistory[0]}</p>
            </React.Fragment>
        );
    } else {
        return (
          <React.Fragment>
              <div id='repo-details' className={`${this.props.repoDetailsDisplayClass}`}>
                <ShowCommitDetails className='commit-messages'
                    commitHistory={this.state}
                    getSelectedCommit={this.getSelectedCommit}
                />
                <ShowFileChanges className='commit-messages'
                    changedFiles={this.state.changedFiles}
                />
              </div>
          </React.Fragment>
          );
    }
  }
}

export default showRepoDetails;