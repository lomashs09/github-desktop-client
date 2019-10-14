import React, { Component } from 'react';
import Header from './Header';
import ShowCommitDetails from './showCommitDetails';
import ShowFileChanges from './showFileChanges';

export default class Show extends Component {
  state = {
    commitHistory: ['Loading data'],
    changedFiles: ['Loading data']
  };

  getSelectedCommit = commitHash => {
    let filename;
    this.props.repoToCloneUrl === undefined
      ? (filename = '')
      : (filename = this.props.repoToCloneUrl.split('/').pop());
    this.props.addNewRepoFilePath === undefined
      ? (filePath = `./${filename}`)
      : (filePath = this.props.addNewRepoFilePath);
    const git = require('simple-git')(filePath);
    git.raw(['show', commitHash], (err, result) => this.setState({ changedFiles: [result] }));
  };

  async componentDidMount() {
    if (this.props.selectedModal === 'clone-repo') {
      const git = require('simple-git');
      console.log('Clonning a Repo');
      await git()
        .silent(true)
        .clone(this.props.repoToCloneUrl)
        .then(() => console.log('finished'));
    }
    let filename;
    this.props.repoToCloneUrl === undefined
      ? (filename = '')
      : (filename = this.props.repoToCloneUrl.split('/').pop());
    this.props.addNewRepoFilePath === undefined
      ? (filePath = `./${filename}`)
      : (filePath = this.props.addNewRepoFilePath);
    const git = require('simple-git')(filePath);

    git.log((err, log) => {
      this.setState({
        commitHistory: [...log.all.map(commit => commit)]
      });
    });
  }

  render() {
    return (
      <>
        <Header />
        <section className="show-details">
          <div className="commits-history">Commit History</div>
          <div className="commit-details">
            <div className="commit-message-overview">Commit Message Overview</div>
            <div className="display-changes">
              <div className="file-changes">File Changes</div>
              <div className="show-changes">Show Changes</div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
