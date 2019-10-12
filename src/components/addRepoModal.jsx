/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import { ipcRenderer, shell } from 'electron';

export default class AddRepoModal extends Component {
  state = {
    path: 'click on choose to add path...'
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
  }
}
