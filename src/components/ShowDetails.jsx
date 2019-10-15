import React, { Component } from 'react';
import Header from './Header';
import CommitHistory from './CommitHistory';
import CommitMessageOverview from './CommitMessageOverview';
import DisplayChanges from './DisplayChanges';
import BranchModal from './BranchModal';

var filePath;

export default class Show extends Component {
  state = {
    modalOverlayClass: '',
    modalDisplayClass: '',
    commitHistory: ['Loading data...'],
    changedFiles: ['Loading data...'],
    selectedCommit: ['Loading data...']
  };

  toggleOverlay = () => {
    this.state.modalOverlayClass === ''
      ? this.setState({
          modalOverlayClass: `modal-overlay-on`
        })
      : this.setState({
          modalOverlayClass: ''
        });
  };

  toggleModalClass = () => {
    this.state.modalDisplayClass === ''
      ? this.setState({
          modalDisplayClass: 'modal-show'
        })
      : this.setState({
          modalDisplayClass: ''
        });
  };

  getSelectedCommit = commitHash => {
    let filename;
    let filePath;
    this.props.repoToCloneUrl === undefined
      ? (filename = '')
      : (filename = this.props.repoToCloneUrl.split('/').pop());
    this.props.addNewRepoFilePath === undefined
      ? (filePath = `./${filename}`)
      : (filePath = this.props.addNewRepoFilePath);
    const clickedCommit = this.state.commitHistory.filter(commit => commitHash === commit.hash);
    const git = require('simple-git')(filePath);
    git.raw(['show', commitHash], (err, result) =>
      this.setState({ changedFiles: [result], selectedCommit: clickedCommit })
    );
  };

  async componentDidMount() {
    if (this.props.selectedModal === 'clone-repo') {
      const git = require('simple-git');
      console.log('Cloning a Repo');
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
      if (log === null) {
        this.setState({ commitHistory: ['No commits yet'] });
      } else {
        this.setState({
          commitHistory: [...log.all.map(commit => commit)]
        });
      }
    });
  }

  render() {
    if (this.state.commitHistory[0] === 'Loading data') {
      return (
        <React.Fragment>
          <p>{this.state.commitHistory[0]}</p>
        </React.Fragment>
      );
    } else {
      return (
        <section className={`${this.props.repoDetailsDisplayClass}`}>
          <Header
            toggleOverlay={this.toggleOverlay}
            toggleModalClass={this.toggleModalClass}
            modalDisplayClass={this.state.modalDisplayClass}
          />
          <BranchModal
            toggleOverlay={this.toggleOverlay}
            toggleModalClass={this.toggleModalClass}
            modalDisplayClass={this.state.modalDisplayClass}
          />
          <section className="show-details">
            <div className="commits-history">
              <CommitHistory
                history={this.state.commitHistory}
                getSelectedCommit={this.getSelectedCommit}
              />
            </div>
            <div className="commit-details">
              <div className="commit-message-overview">
                <CommitMessageOverview selectedCommit={this.state.selectedCommit} />
              </div>
              <div className="display-changes">
                <DisplayChanges
                  className="commit-messages"
                  changedFiles={this.state.changedFiles}
                />
              </div>
            </div>
            <div
              className={`modal-overlay  + ${this.state.modalOverlayClass}`}
              onClick={() => {
                this.toggleOverlay();
                this.toggleModalClass();
              }}
            />
          </section>
        </section>
      );
    }
  }
}
