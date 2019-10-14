/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import gitP from 'simple-git/promise';

export default class AddRepoModal extends Component {
  state = {
    path: 'Click on choose to add path...',
    newRepoName: '',
    addReadmeCheckboxState: false
  };
  onChange = e => {
    this.props.repoToClonePath(e.target.value);
  };

  setNewRepoName = e => {
    this.setState({
      newRepoName: e.target.value
    });
  };
  componentDidMount() {
    ipcRenderer.on('folderPath', (event, arg) => {
      this.setState({
        path: arg
      });
    });

    ipcRenderer.on('newFile', (event, arg) => {
      const git = gitP(arg);
      git.init();
      if (this.state.addReadmeCheckboxState)
        ipcRenderer.send('Repo', { name: 'CREATE_README', path: arg });
      //   this.props.setRepoDetailsDisplayClass(arg);
    });
  }

  createGitFolder = () => {
    ipcRenderer.send('Repo', {
      type: 'CREATE_REPO',
      path: this.state.path[0],
      repoName: this.state.newRepoName
    });
  };
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
                ipcRenderer.send('Repo', 'ADD_REPO');
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

            <form>
              <label for="name">Name</label>
              <input
                placeholder="Enter the repo Name..."
                id="repo-url"
                type="text"
                class="validate"
                onChange={this.setNewRepoName}
                required
              />
              <br />
              <label>Description</label>
              <input
                placeholder="Enter the repo Description..."
                id="repo-url"
                type="text"
                class="validate"
                required
              />

              <span>Local Path:</span>
              <ul className="collection">
                <li className="collection-item path-location">{this.state.path}</li>
              </ul>
              <a
                className="waves-effect waves-light btn-small grey lighten-2 black-text align-right create-repo-choose"
                onClick={() => {
                  ipcRenderer.send('Repo', 'ADD_REPO');
                }}
              >
                Choose...
              </a>
              <p>
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.addReadmeCheckboxState}
                    onClick={() => {
                      this.setState({
                        addReadmeCheckboxState: !this.state.addReadmeCheckboxState
                      });
                    }}
                  />
                  <span class="black-text">Initialize this repository with a README</span>
                </label>
              </p>
            </form>
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
              onClick={async () => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.createGitFolder();
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
