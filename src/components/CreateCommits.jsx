/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import ChangedFile from './ChangedFile';
import CreateCommit from './CreateCommit';

export class CreateCommits extends Component {
  render() {
    const { status } = this.props;
    return (
      <>
        <div className="checkbox-and-changed-file">
          <ul className="collection collection-changedFile">
          {status.conflicted.length === 0
              ? ''
              : status.conflicted.map(conflictedFile => (
                <ChangedFile
                    fileName={conflictedFile}
                    getSelectedChangedFile={this.props.getSelectedChangedFile}
                    modificationType="modify" //later changed it's type to 'conflicted'
                    addFilesToStagingArea={this.props.addFilesToStagingArea}
                    status={this.props.status}
                    mergeConflictsExist={this.props.mergeConflictsExist}
                  />
                ))}
            {status.not_added.length === 0
              ? ''
              : status.not_added.map(newFile => (
                <ChangedFile
                    fileName={newFile}
                    getSelectedChangedFile={this.props.getSelectedChangedFile}
                    modificationType="add"
                    addFilesToStagingArea={this.props.addFilesToStagingArea}
                    status={this.props.status}
                  />
                ))}
            {status.modified.length === 0
              ? ''
              : status.modified.map(modifiedFile => (
                <ChangedFile
                    fileName={modifiedFile}
                    getSelectedChangedFile={this.props.getSelectedChangedFile}
                    modificationType="modify"
                    addFilesToStagingArea={this.props.addFilesToStagingArea}
                    status={this.props.status}
                  />
                ))}
            {status.deleted.length === 0
              ? ''
              : status.deleted.map(deletedFile => (
                <ChangedFile
                    fileName={deletedFile}
                    getSelectedChangedFile={this.props.getSelectedChangedFile}
                    modificationType="delete"
                    addFilesToStagingArea={this.props.addFilesToStagingArea}
                    status={this.props.status}
                  />
                ))}
          </ul>
        </div>

        <CreateCommit makeCommit={this.props.makeCommit} mergeConflictsExist={this.props.mergeConflictsExist}/>
      </>
    );
  }
}

export default CreateCommits;
