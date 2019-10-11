/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class HomePage extends Component {
  state = {
    modalOverlayClass: '',
    modalDisplayClass: ''
  };

  toggleOverlay = () => {
    this.state.modalOverlayClass === ''
      ? this.setState({
          modalOverlayClass: 'modal-overlay-on'
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

  render() {
    return (
      <React.Fragment>
        <section className="title container">
          <h3>Let's get started!</h3>
          <p>Add a repository to GitHub Desktop to start collaborating</p>
          <a className="git-actions-button waves-effect waves-light btn-large grey lighten-2 black-text">
            <i className="material-icons left">collections_bookmark</i>
            <span className="button-text clone-text">Clone a Repository from the Internet...</span>
          </a>

          <br />
          <a className="git-actions-button waves-effect waves-light btn-large grey lighten-2 black-text">
            <i className="material-icons left">add_box</i>
            <span className="button-text create-text">
              {' '}
              Create a New Repository on your Hard Drive...
            </span>
          </a>
          <br />
          <a className="git-actions-button waves-effect waves-light btn-large grey lighten-2 black-text">
            <i className="material-icons left">folder</i>
            <span className="button-text add-text">
              {' '}
              Add an Existing Repository from your Hard Drive...
            </span>
          </a>
        </section>
        <section className="addRepoModal">
          <React.Fragment>
            <addRepoModal
              toggleOverlay={this.toggleOverlay}
              toggleModalClass={this.toggleModalClass}
            />
            <div
              className={`modal-overlay  + ${this.state.modalOverlayClass}`}
              onClick={() => {
                this.toggleOverlay();
                this.toggleModalClass();
              }}
            />
          </React.Fragment>
        </section>
      </React.Fragment>
    );
  }
}

export default HomePage;
