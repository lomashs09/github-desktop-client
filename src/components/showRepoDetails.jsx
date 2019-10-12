/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
class showRepoDetails extends Component {
  state = {
    commitHistory: ['Loading data']
  };
 async componentDidMount() {
  const git = require('simple-git')(this.props.addNewRepoFilePath)
//   console.log('Clonning a Repo')
//   console.log(this.props.repoToClone)
//   git.silent(true)
//   .clone(this.props.repoToCloneUrl)
//   .then(() => console.log('finished'))
  
//   git.log( async (err, log) => commitHistory = await log)
//   git.log((err, log) => log.all.map((commit) => console.log(commit)));
  git.log((err, log) => this.setState({commitHistory:[...log.all.map((commit) => commit)]}))
}
  render() {
    if(this.state.commitHistory[0] === 'Loading data') {
        return (
            <React.Fragment>
                <p>{this.state.commitHistory[0]}</p>
            </React.Fragment>
        );

    } else {
        console.log(this.state);
        return (
            <React.Fragment>
              <div id='repo-details' className={`${this.props.repoDetailsDisplayClass}`}>
                  <h4>Commit Details:</h4>
                  <div className = 'commit-messages'>
                    {this.state.commitHistory.map((commit) => 
                         <div className='commit-message'>
                            <p>SHA: {commit.hash}</p>
                            <p>Message: {commit.message}</p>
                            <p>Author: {commit.author_name}</p>
                            <p>Author Email: {commit.author_email}</p>
                            <p>Timestamp: {commit.date}</p>
                            <p>-----------------------------------------------------------------------------</p>
                         </div>
                    )}
                    </div> 
              </div>
            </React.Fragment>
          );
    }
  }
}

export default showRepoDetails;