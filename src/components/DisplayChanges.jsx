import React, { Component } from 'react';
import { Diff2Html } from 'diff2html';

export class DisplayChanges extends Component {
  render() {
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
        <div>
          <h4>File Changes</h4>
          <p className="diff-to-html" dangerouslySetInnerHTML={{ __html: this.outputHtml }} />
        </div>
      </>
    );
  }
}

export default DisplayChanges;
