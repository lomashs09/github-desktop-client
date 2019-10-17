import React from 'react';

export default function OpenEditorModal() {
  return (
    <div id="modal1" className="modal">
      <div className="modal-content">
        <h4>Merge Conflict Occured</h4>
        <p>Open in Editor to fix conflict</p>
        <button>Open in Editor</button>
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
      </div>
    </div>
  );
}
