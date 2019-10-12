/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
const git = require('simple-git')('/home/lomash/github-boilerplate')
class showRepoDetails extends Component {
  state = {
    commitMessage: ['Loading data']
  };

componentDidMount(){
  // const messages =git.log().log((err, log) => log).log('0.11.0', '0.12.0', (err, log) => console.log(log));
  // this.setState({commitMessage: [messages]})
  console.log('Clonning a Repo')
  console.log(this.props.repoToClone)
  git.silent(true)
  .clone(this.props.repoToCloneUrl)
  .then(() => console.log('finished'))
  git.log((err, log) => this.setState({commitMessage:[log.all.map((commit) => commit.message)]}))

  // git.log((err, log) => this.setState({commitMessage:log.all.map((commit) => commit.message)}))



  //   .log('0.11.0', '0.12.0', (err, log) => log);
  // console.log(messages);
}
/**
 *     .log((err, log) => console.log(log))
    .log('0.11.0', '0.12.0', (err, log) => console.log(log));
 */
  render() {
    console.log(this.props.repoToCloneUrl)
    return (
      <React.Fragment>
        <div id='repo-details' className={`${this.props.repoDetailsDisplayClass}`}>
            <h3>Repository Details</h3>
            <h4>Commit Messages:</h4>
            {/* <h6>Show changed files, commit history, commit messages, etc...</h6> */}
            {/* <p>{this.state.commitMessage[0]}</p> */}
            {/* {console.log(this.state.commitMessage[0].all)} */}
            <div className = 'commit-messages'>
              {/* {console.log(this.state.commitMessage)} */}
            {/* {this.state.commitMessage.map((message) => <p>{message}</p>)} */}

            {console.log([this.state.commitMessage[0]])}
            {this.state.commitMessage.map((messages) => <p>{messages[0]}</p>)}
            {this.state.commitMessage.map((messages) => <p>{messages[1]}</p>)}
            {this.state.commitMessage.map((messages) => <p>{messages[2]}</p>)}
            {this.state.commitMessage.map((messages) => <p>{messages[2]}</p>)}
            </div>
            
        </div>
      </React.Fragment>
    );
  }
}

export default showRepoDetails;