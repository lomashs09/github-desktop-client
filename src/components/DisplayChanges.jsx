import React, { Component } from 'react';
import { Diff2Html } from 'diff2html';

export class DisplayChanges extends Component {
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
        <p className="diff-to-html">{this.props.changedFiles}</p>
        {this.diffToHtml(this.props.changedFiles[0])}
      </React.Fragment>
    );
  }
}

export default DisplayChanges;
