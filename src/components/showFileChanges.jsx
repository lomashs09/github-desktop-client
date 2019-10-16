/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Diff2Html } from 'diff2html';

class showFileChanges extends Component {
    render() {
    let diffText = this.props.changedFiles[0];
    let outputHtml = Diff2Html.getPrettyHtml(diffText, {inputFormat: 'diff', showFiles: true, matching: 'lines', outputFormat: 'side-by-side'});
    this.outputHtml = outputHtml;
    return (
      <React.Fragment>
        <div>
         <h4>File Changes</h4>
         {/* <p className='diff-to-html'>{this.props.changedFiles}</p> */}
          <p className='diff-to-html' dangerouslySetInnerHTML={{__html: this.outputHtml}} /> 
        </div>
      </React.Fragment>
    );
  }
}

export default showFileChanges;
