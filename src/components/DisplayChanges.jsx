import React, { Component } from 'react';
import { Diff2Html } from 'diff2html';

export class DisplayChanges extends Component {
  render() {
    console.log(this.props.changedFiles);
    const diffText = this.props.changedFiles[0];
    const outputHtml = Diff2Html.getPrettyHtml(diffText, {
      inputFormat: 'diff',
      showFiles: true,
      matching: 'lines',
      outputFormat: 'side-by-side'
    });
    this.outputHtml = outputHtml;
    return (
      <>
        <p className="diff-to-html" dangerouslySetInnerHTML={{ __html: this.outputHtml }} />
      </>
    );
  }
}

export default DisplayChanges;
