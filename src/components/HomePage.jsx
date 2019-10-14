/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import AddRepoModal from './addRepoModal.jsx';
import ShowRepoDetails from './showRepoDetails';
class HomePage extends Component {
  state = {
    modalOverlayClass: '',
    modalDisplayClass: '',
    repoDetailsDisplayClass: 'repo-details-hide',
    selectedModal: 'new-repo',
    repoToCloneUrl: '',
    addNewRepoFilePath: ''
  };

  toggleOverlay = () => {
    console.log(this.state.selectedModal);
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

  setRepoDetailsDisplayClass = filepath => {
    this.state.repoDetailsDisplayClass === 'repo-details-hide'
      ? this.setState({
          repoDetailsDisplayClass: 'repo-details-show',
          addNewRepoFilePath: filepath
        })
      : this.setState({
          repoDetailsDisplayClass: 'repo-details-hide'
        });
  };

  repoToClonePath = url => {
    this.setState({ repoToCloneUrl: url });
  };

  render() {
    if (this.state.repoDetailsDisplayClass === 'repo-details-hide') {
      return (
        <React.Fragment>
          <section className="title container">
            <h3>Let's get started!</h3>
            <p>Add a repository to GitHub Desktop to start collaborating</p>
            <AddRepoModal
              selectedModal={this.state.selectedModal}
              toggleOverlay={this.toggleOverlay}
              toggleModalClass={this.toggleModalClass}
              modalDisplayClass={this.state.modalDisplayClass}
              setRepoDetailsDisplayClass={this.setRepoDetailsDisplayClass}
              repoToClonePath={this.repoToClonePath}
            />
            <a
              className="git-actions-button waves-effect waves-light btn-large grey lighten-2 black-text"
              onClick={() => {
                this.setState({ selectedModal: 'clone-repo' });
                this.toggleOverlay();
                this.toggleModalClass();
              }}
            >
              <i className="material-icons left">collections_bookmark</i>
              <span className="button-text clone-text">
                Clone a Repository from the Internet...
              </span>{' '}
            </a>
            <br />
            <a
              className="git-actions-button waves-effect waves-light btn-large grey lighten-2 black-text"
              onClick={() => {
                this.setState({ selectedModal: 'exist-repo' });
                this.toggleOverlay();
                this.toggleModalClass();
              }}
            >
              <i className="material-icons left">add_box</i>
              <span className="button-text create-text">
                {' '}
                Create a New Repository on your Hard Drive...
              </span>
            </a>
            <br />
            <a
              className="git-actions-button waves-effect waves-light btn-large grey lighten-2 black-text"
              onClick={() => {
                this.setState({ selectedModal: 'new-repo' });
                this.toggleOverlay();
                this.toggleModalClass();
              }}
            >
              <i className="material-icons left">folder</i>
              <span className="button-text add-text">
                {' '}
                Add an Existing Repository from your Hard Drive...
              </span>
            </a>
          </section>
          <div
            className={`modal-overlay  + ${this.state.modalOverlayClass}`}
            onClick={() => {
              this.toggleOverlay();
              this.toggleModalClass();
            }}
          />
        </React.Fragment>
      );
    } else {
      // console.log(this.state);
      return (
        <ShowRepoDetails
          repoDetailsDisplayClass={this.state.repoDetailsDisplayClass}
          repoToCloneUrl={this.state.repoToCloneUrl}
          addNewRepoFilePath={this.state.addNewRepoFilePath}
        />
      );
    }
  }
}

export default HomePage;
