import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export default class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper black">
          <a href="./" className="brand-logo right">
            <img className="logo" src="/assets/logo.png" />
            <span className="logo-text">GitHub</span>
          </a>
          <ul id="nav-mobile" className="left">
            <li>
              <a>Current Repository</a>
            </li>
            <li
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.modalToDisplay('branch-modal')
              }}
            >
              <a>Branch</a>
            </li>
            <li
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.modalToDisplay('publish-modal')
              }}
            >
              <a>Publish Repository</a>
            </li>
            <li
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.modalToDisplay('pull-modal')
              }}
            >
              <a>Pull</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
