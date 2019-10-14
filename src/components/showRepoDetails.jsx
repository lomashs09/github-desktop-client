/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import ShowCommitDetails from './showCommitDetails';
import ShowFileChanges from './showFileChanges';
var filePath;
// if(this.props.selecteModal =)

class showRepoDetails extends Component {
    
    state = {
    commitHistory: ['Loading data'],
    changedFiles : ['Loading data']
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
  
    // git.diffSummary((err, diffSummary) => console.log(diffSummary));
    // git.diff((err, diff) => console.log(diff));

    // git.branch((err,branches) => console.log(branches));

    // git.status((err, status) => console.log(status));

    // git.log((err, log) => log.all.map((commit) => console.log(commit.hash)))


  git.log((err, log) =>{
    this.setState({
      commitHistory: [...log.all.map((commit) => commit)],
    //   selectedCommit: [log.all[0].hash]
    })})
  
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









    // } else {
    //     const git = require('simple-git')(this.props.addNewRepoFilePath)
    //     // let hashArr = this.state.commitHistory.map((commit) => commit.hash);
    //     // git.show([...hashArr])
    //     // console.log(hashArr);
    //         // require('simple-git')().raw(['diff'], (err, result) => {
    // //     console.log(err)
    // //     console.log(result)
    // // })

    //     this.state.commitHistory.map((commit) => {
    //         git.raw(['show', commit.hash], (err,result) => {
    //             console.log(result)
    //         })
    //     })
    //     return (
    //         <React.Fragment>
    //           <div id='repo-details' className={`${this.props.repoDetailsDisplayClass}`}>
    //               <h4>Commit Details:</h4>
    //               <div className = 'commit-messages'>
    //                 {this.state.commitHistory.map((commit) => 
    //                      <div className='commit-message'>
    //                         <p>SHA: {commit.hash}</p>
    //                         <p>Message: {commit.message}</p>
    //                         <p>Author: {commit.author_name}</p>
    //                         <p>Author Email: {commit.author_email}</p>
    //                         <p>Timestamp: {commit.date}</p>
    //                         <p>-----------------------------------------------------------------------------</p>
    //                      </div>
    //                 )}
    //                 </div>
    //             </div>
    //       </React.Fragment>
    //       );
    // }
  }
}

export default showRepoDetails;