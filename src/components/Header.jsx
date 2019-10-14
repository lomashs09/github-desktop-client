import React, { Component } from 'react';

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
            <li>
              <a>Current Branch</a>
            </li>
            <li>
              <a>Publish Repository</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
