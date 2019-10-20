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
        <div className="modal-content merge-section-content">
          <h4>Merge Conflict Occured</h4>
          <h5>Open in Editor to Fix the Conflict</h5>
          <a
            className="waves-effect waves-light btn blue darken-2 open-editor-btn"
            onClick={() => {
              ipcRenderer.send('Repo', {
                type: 'OPEN_EDITOR',
                path: this.props.filePath
              });
            }}
          >
            <i className="material-icons right">description</i>
            Open in the Editor
          </a>

          <div className="conflict-show-changes">
            <DisplayChanges
              className="commit-messages"
              changedFiles={this.props.mergedFileChanges}
              outputFormat={this.props.outputFormat}
            />
          </div>
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
