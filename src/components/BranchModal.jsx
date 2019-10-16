/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export class BranchModal extends Component {
  render() {
    return (
      <div id="modal1" className={`modal + ${this.props.modalDisplayClass}`}>
        <div className="modal-content white">
          <h4>BRANCHES</h4>
        </div>
        <span className="new-branch-text">Create New Branch</span>
        <div className="input-field col s8 branch-name-input">
          <input placeholder="Enter branch name" id="first_name" type="text" className="validate" />
          <a className="waves-effect waves-light btn-small blue darken-2 white-text">
            <i className="material-icons right">add_circle</i>
            CREATE
          </a>
        </div>
        <div className="input-field col s12">
          <select className="choose-branch">
            <option value="" disabled selected>
              Choose your branch
            </option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </select>
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

export default BranchModal;
