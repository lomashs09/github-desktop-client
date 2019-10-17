import React, { Component } from 'react';
import Header from './Header';
import CommitHistory from './CommitHistory';
import CommitMessageOverview from './CommitMessageOverview';
import DisplayChanges from './DisplayChanges';
import CreateCommits from './CreateCommits';
import BranchModal from './BranchModal';

var filePath;

export default class Show extends Component {
  state = {
    modalOverlayClass: '',
    modalDisplayClass: '',
    commitHistory: ['Loading data...'],
    changedFiles: ['Loading data...'],
    selectedCommit: ['Loading data...'],
    gitStatus: ['Loading data...'],
    selectedCommit: ['Loading data...'],
    filePath:'',
    checkboxStatus: []
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
      this.setState({ changedFiles: [result], selectedCommit: clickedCommit,filePath:filePath })
    );
  };


  getSelectedChangedFile = (fileName, modificationType) => {
    const git = require('simple-git')(this.props.addNewRepoFilePath);
    modificationType === 'modify' ? git.raw(['show'], (err, result) => this.setState({ changedFiles: [result] })) : git.raw(['diff', '--', '/dev/null', fileName], (err, result) => this.setState({ changedFiles: [result] }));
  }

  makeCommit = (commitMessage) => {
    const git = require('simple-git')(this.props.addNewRepoFilePath);
    if(commitMessage === '') {
      alert("Commit message can't be empty");
    } else {
      git.commit(commitMessage, (err, res) => console.log(res));	
    }
  }

  addFilesToStagingArea = (fileName, isChecked) => {
    const git = require('simple-git')(this.props.addNewRepoFilePath);
    if(isChecked === true) {
      git.add([fileName], (err, result) => console.log(result));	
    } else {
      git.reset([fileName], (err,result) => console.log(result));
    }
  }

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
//----------------------------Conditionally run this if user clicks on 'History'-----------------------
    // git.log((err, log) => {
    //   if (log === null) {
    //     this.setState({ commitHistory: ['No commits yet'] });
    //   } else {
    //     this.setState({
    //       commitHistory: [...log.all.map(commit => commit)],
    //     });
    //   }
    // });


//----------------------------Conditionally run this if user clicks on 'History'-----------------------

    git.status((err, status) => this.setState({ gitStatus: status }))
    console.log(this.state.gitStatus);
  }

  render() {
    console.log(this.state.checkboxStatus);
    if ((this.state.commitHistory[0] === 'Loading data...') && (this.state.gitStatus[0] === 'Loading data...')) {
      return (
        <React.Fragment>
          <p>{this.state.commitHistory[0]}</p>
        </React.Fragment>
      );
    } else if (this.state.gitStatus[0] === 'Loading data...') {
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
            history={this.state.commitHistory}
            getSelectedCommit={this.getSelectedCommit}
            filePath={this.state.filePath}
          />
          <section className="show-details">
            <div className="commits-history">
              <CommitHistory
                filePath={this.state.filePath}
                history={this.state.commitHistory}
                getSelectedCommit={this.getSelectedCommit}
                filePath={this.state.filePath}
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
    } else {
      return (
        <section className={`${this.props.repoDetailsDisplayClass}`}>
          <Header />
          <section className="show-details">
            <div className="commits-history">
              <CreateCommits
                status={this.state.gitStatus}
                getSelectedChangedFile={this.getSelectedChangedFile}
                addFilesToStagingArea={this.addFilesToStagingArea}
                makeCommit={this.makeCommit}
              />
            </div>
            <div className="commit-details">
              {/* <div className="commit-message-overview">
                <CommitMessageOverview selectedCommit={this.state.selectedCommit} />
              </div> */}
              <div className="display-changes">
                <DisplayChanges
                  className="commit-messages"
                  changedFiles={this.state.changedFiles}
                />
              </div>
            </div>
          </section>
        </section>
      );
    }
  }
}
