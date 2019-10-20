import React, { Component } from 'react';
import { ReactGhLikeDiff } from 'react-gh-like-diff';
import 'react-gh-like-diff/lib/diff2html.min.css';

export class DisplayChanges extends Component {
  render() {
    const diffText = this.props.changedFiles[0];
    console.log(this.props.changedFiles)
    const optionsD = {
      inputFormat: 'diff',
      showFiles: true,
      matching: 'lines',
      outputFormat: `${this.props.outputFormat}`
    };
    return <ReactGhLikeDiff className="diff-to-html" options={optionsD} diffString={diffText} />;
  }
}

export default DisplayChanges;
