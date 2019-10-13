/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class showFileChanges extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
                <h4>File Changes</h4>
                <p>{this.props.changedFiles}</p>
                </div>
      </React.Fragment>
    );
  }
}

export default showFileChanges;
