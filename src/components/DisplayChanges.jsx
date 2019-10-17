import React, { Component } from 'react';
import { ReactGhLikeDiff } from 'react-gh-like-diff';
import 'react-gh-like-diff/lib/diff2html.min.css';

export class DisplayChanges extends Component {
  render() {
    console.log(this.props.changedFiles);
    const diffText = this.props.changedFiles[0];
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
