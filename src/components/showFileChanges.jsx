/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Diff2Html } from 'diff2html';

<<<<<<< HEAD
class showFileChanges extends Component {
  diffToHtml = changedFiles => {
    setTimeout(function() {
      let diffText = changedFiles;
      let outputHtml = Diff2Html.getPrettyHtml(diffText, {
        inputFormat: 'diff',
        showFiles: true,
        matching: 'lines',
        outputFormat: 'side-by-side'
      });
      this.outputHtml = outputHtml;
      document.querySelector('.diff-to-html').innerHTML = this.outputHtml;
    }, 1000);
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h4>File Changes</h4>
          <p className="diff-to-html">{this.props.changedFiles}</p>
          {this.diffToHtml(this.props.changedFiles[0])}
        </div>
        <div>
  </div>
=======

class showFileChanges extends Component {
    render() {
    let diffText = this.props.changedFiles[0];
    let outputHtml = Diff2Html.getPrettyHtml(diffText, {inputFormat: 'diff', showFiles: true, matching: 'lines', outputFormat: 'side-by-side'});
    this.outputHtml = outputHtml;
    return (
      <React.Fragment>
        <div>
         <h4>File Changes</h4>
          <p className='diff-to-html' dangerouslySetInnerHTML={{__html: this.outputHtml}} /> 
        </div>
>>>>>>> 2ce60ed37295d99016be2f8ead0e2546d5b7671c
      </React.Fragment>
    );
  }
}

export default showFileChanges;
