/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
class showRepoDetails extends Component {
  state = {
    commitMessage: ['Loading data']
  };
 componentDidMount() {
  const git = require('simple-git')(this.props.addNewRepoFilePath)
  git.log((err, log) => this.setState({commitMessage:[log.all.map((commit) => commit.message)]}))
}
  render() {
    if(this.state.commitMessage[0] === 'Loading data') {
        return (
            <React.Fragment>
                <p>{this.state.commitMessage}</p>
            </React.Fragment>
        );

    } else {
        return (
            <React.Fragment>
              <div id='repo-details' className={`${this.props.repoDetailsDisplayClass}`}>
                  <h4>Commit Messages:</h4>
                  <div className = 'commit-messages'>
                  {this.state.commitMessage[0].map((message) => <p>{message}</p>)}
      
                </div>
                  
              </div>
            </React.Fragment>
          );
    }
  }
}

export default showRepoDetails;