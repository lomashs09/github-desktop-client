import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

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
                type: 'OPEN_EDITOR'
              });
            }}
          >
            Open in Editor
          </button>
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
