/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import ShowCommitDetails from './showCommitDetails';
import ShowFileChanges from './showFileChanges';
var filePath;

class showRepoDetails extends Component {
    
    state = {
    commitHistory: ['Loading data'],
    changedFiles : ['Loading data'],
    filePath:''
  };

  getSelectedCommit = (commitHash) => {
    let filename;
    this.props.repoToCloneUrl ===undefined ? filename = '': filename =  this.props.repoToCloneUrl.split('/').pop();
    this.props.addNewRepoFilePath === undefined ? filePath = `./${filename}` : filePath = this.props.addNewRepoFilePath;

    const git = require('simple-git')(filePath);
    git.raw(['show', commitHash], (err,result) => this.setState({ changedFiles: [result] }));
  }

 async componentDidMount() {
   if(this.props.selectedModal ==='clone-repo'){
    const git = require('simple-git')
    console.log('Cloning a Repo')
    await git().silent(true)
    .clone(this.props.repoToCloneUrl)
    .then(() => console.log('finished'))
    
   }
  let filename;
  this.props.repoToCloneUrl ===undefined ? filename = '': filename =  this.props.repoToCloneUrl.split('/').pop();
  this.props.addNewRepoFilePath === undefined ? filePath = `./${filename}` : filePath = this.props.addNewRepoFilePath;
  const git = require('simple-git')(filePath);
  this.setState({filePath:filePath})
  git.log((err, log) =>{
    this.setState({
      commitHistory: [...log.all.map((commit) => commit)],
    })})
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
                    filePath ={this.state.filePath}
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