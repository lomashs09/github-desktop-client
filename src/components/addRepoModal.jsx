/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import { ipcRenderer, shell } from 'electron';

export default class AddRepoModal extends Component {
  state = {
    path: 'click on choose to add path...'
  };
  onChange = e => {
    this.props.repoToClonePath(e.target.value);
    // this.props.repoToCloneUrl.setState({repoToCloneUrl:e.target.value})
  };
  componentDidMount() {
    ipcRenderer.on('folderPath', (event, arg) => {
      this.setState({
        path: arg
      });
    });
    // console.log(this.state.path)
  }

  render() {
    if (this.props.selectedModal == 'new-repo') {
      return (
        <div id="modal1" className={`modal + ${this.props.modalDisplayClass}`}>
          <div className="modal-content white">
            <h4>ADD LOCAL REPOSITORY</h4>
            <h6>Local Path</h6>
            <ul className="collection">
              <li className="collection-item path-location">{this.state.path}</li>
            </ul>
            <a
              className="waves-effect waves-light btn-small grey lighten-2 black-text align-right"
              onClick={() => {
                ipcRenderer.send('add local repo', 'ADD_REPO');
              }}
            >
              Choose...
            </a>
          </div>
          <div className="modal-footer">
            <a
              className="modal-close waves-effect waves-green btn-flat"
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
              }}
            >
              CLOSE
            </a>
            <a
              className="add-repo waves-effect waves-green btn-flat blue darken-2 white-text"
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.setRepoDetailsDisplayClass(this.state.path[0]);
                // console.log(this.state.path[0]);

                // shell.openItem(this.state.path[0]);
                // Opens the chosen folder/file in a new window
              }}
            >
              ADD REPOSITORY
            </a>
          </div>
        </div>
      );
    } else if (this.props.selectedModal == 'clone-repo') {
      return (
        <div id="modal1" className={`modal + ${this.props.modalDisplayClass}`}>
          <div className="modal-content white">
            <h4>CLONE REPOSITORY</h4>
            <h6>Add Url</h6>
            <ul className="collection">
              <form>
                <input
                  onChange={this.onChange}
                  placeholder="Enter the Url to Clone..."
                  id="repo-url"
                  type="text"
                  class="validate"
                />
              </form>
            </ul>
          </div>
          <div className="modal-footer">
            <a
              className="modal-close waves-effect waves-green btn-flat"
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
              }}
            >
              CLOSE
            </a>
            <a
              className="add-repo waves-effect waves-green btn-flat blue darken-2 white-text"
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.setRepoDetailsDisplayClass();
                // shell.openItem(this.state.path[0]);
                // Opens the chosen folder/file in a new window
              }}
            >
              CLONE REPOSITORY
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div id="modal1" className={`modal + ${this.props.modalDisplayClass}`}>
          <div className="modal-content white">
            <h4>CREATE A NEW REPOSITORY</h4>

            <ul className="collection">
              <form>
                <label for="name">Name</label>
                <input
                  placeholder="Enter the repo Name..."
                  id="repo-url"
                  type="text"
                  class="validate"
                />
                <label>Description</label>
                <input
                  placeholder="Enter the repo Description..."
                  id="repo-url"
                  type="text"
                  class="validate"
                />
              </form>
            </ul>
          </div>
          <div className="modal-footer">
            <a
              className="modal-close waves-effect waves-green btn-flat"
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
              }}
            >
              CLOSE
            </a>
            <a
              className="add-repo waves-effect waves-green btn-flat blue darken-2 white-text"
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.setRepoDetailsDisplayClass();
                // shell.openItem(this.state.path[0]);
                // Opens the chosen folder/file in a new window
              }}
            >
              CREATE
            </a>
          </div>
        </div>
      );
    }
  }
}
