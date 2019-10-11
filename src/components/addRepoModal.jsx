/* eslint-disable react/prefer-stateless-function */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';

export default class AddRepoModal extends Component {
  render() {
    return (
      <div id="modal1" className={`modal + ${this.props.modalDisplayClass}`}>
        <div className="modal-content white">
          <h4>ADD LOCAL REPOSITORY</h4>
          <h6>Local Path</h6>
          <ul className="collection">
            <li className="collection-item path-location">Alvin</li>
          </ul>
          <a className="waves-effect waves-light btn-small grey lighten-2 black-text align-right">
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
        </div>
      </div>
    );
  }
}
