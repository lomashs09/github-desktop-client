import React, { Component } from 'react';
// import Commits from './Commits';

export class CreateCommits extends Component {
      
    render() {
    const status = this.props.status;
    console.log(status.created);
    console.log(`We're in creation now : ${status.created}`);
    return (
      <>
      { status.created.length === 0 ? <p></p> : status.created.map((newFile) => <p>{newFile}[+]</p>)}
      { status.modified.length === 0 ? <p></p> : status.modified.map((modifiedFile) => <p>{modifiedFile}[M]</p>)}
      { status.deleted.length === 0 ? <p></p> : status.deleted.map((deletedFile) => <p>{deletedFile}[-]</p>)}
      </>
    );
  }
}

export default CreateCommits;
