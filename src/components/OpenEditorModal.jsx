import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

import DisplayChanges from './DisplayChanges';

export default class OpenEditorModal extends Component {
  componentDidMount() {
    ipcRenderer.on('openedEditor', (event, arg) => {
      if (arg === 'opened') {
        this.props.toggleOverlayEditorModal();
        this.props.toggleModalClassEditor();
      }
    });
  }

  render() {
    return (
      <div id="modal1" className={`modal + ${this.props.modalDisplayClassEditor}`}>
        <div className="modal-content">
          <h4>Merge Conflict Occured</h4>
          <p>Open in Editor to fix conflict</p>
          <button
            onClick={() => {
              ipcRenderer.send('Repo', {
                type: 'OPEN_EDITOR',
                path: this.props.filePath
              });
            }}
          >
            Open in Editor
          </button>
          <DisplayChanges
            className="commit-messages"
            changedFiles={this.props.mergedFileChanges}
            outputFormat={this.props.outputFormat}
          />
        </div>
        <div className="modal-footer">
          <a
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => {
              this.props.toggleOverlayEditorModal();
              this.props.toggleModalClassEditor();
            }}
          >
            CLOSE
          </a>
        </div>
      </div>
    );
  }
}
