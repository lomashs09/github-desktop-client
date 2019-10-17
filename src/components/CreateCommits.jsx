import React, { Component } from 'react';
import ChangedFile from './ChangedFile';
import CreateCommit from './CreateCommit';

export class CreateCommits extends Component {
      
    render() {
    const status = this.props.status;
    console.log(status);
    return (
      <>
      { status.not_added.length === 0 ? '' : status.not_added.map((newFile) => 
      <ChangedFile 
        fileName={newFile}
        getSelectedChangedFile={this.props.getSelectedChangedFile}
        modificationType={'add'}
        addFilesToStagingArea={this.props.addFilesToStagingArea}
        status={this.status}
      />
      )}
      { status.modified.length === 0 ? '' : status.modified.map((modifiedFile) => 
        <ChangedFile 
            fileName={modifiedFile}
            getSelectedChangedFile={this.props.getSelectedChangedFile}
            modificationType={'modify'}
            addFilesToStagingArea={this.props.addFilesToStagingArea}
            status={this.status}
            />
      )}
      { status.deleted.length === 0 ? '' : status.deleted.map((deletedFile) => 
            <ChangedFile 
                fileName={deletedFile}
                getSelectedChangedFile={this.props.getSelectedChangedFile}
                modificationType={'delete'}
                addFilesToStagingArea={this.props.addFilesToStagingArea}
                status={this.status}
                />
      )}
      <CreateCommit 
      makeCommit={this.props.makeCommit}
      />
      </>
    );
  }
}

export default CreateCommits;
