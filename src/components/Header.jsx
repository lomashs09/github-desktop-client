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
              <a href="./">
                <i className="material-icons">home</i>
              </a>
            </li>
            <li
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.modalToDisplay('branch-modal');
              }}
            >
              <a>
                Branch
                <i className="material-icons right arrow-icon">arrow_drop_down</i>
              </a>
            </li>
            <li
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.modalToDisplay('publish-modal');
              }}
            >
              <a>
                Publish Repository
                <i className="material-icons right arrow-icon">arrow_drop_down</i>
              </a>
            </li>
            <li
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.modalToDisplay('pull-modal');
              }}
            >
              <a>
                Pull
                <i className="material-icons right arrow-icon">arrow_drop_down</i>
              </a>
            </li>
            <li
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.modalToDisplay('merge-modal');
              }}
            >
              <a>
                Merge
<i className="material-icons right arrow-icon">arrow_drop_down</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
