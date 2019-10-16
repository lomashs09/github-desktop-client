import React, { Component } from 'react';
import ChangedFile from './ChangedFile';

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
      />
    //   <div className='changedFiles-staging-area'>
    //     <input type='checkbox'></input>
    //     <p onClick={this.props.getSelectedChangedFile.bind(this, newFile, 'add')}>{newFile}[+]</p>
    //   </div>
      )}
      { status.modified.length === 0 ? '' : status.modified.map((modifiedFile) => 
        //     <div className='changedFiles-staging-area'>
        //     <input type='checkbox'></input>
        //     {/* <p>{modifiedFile}[M]</p> */}
        //     <p onClick={this.props.getSelectedChangedFile.bind(this, modifiedFile, 'modify')}>{modifiedFile}[M]</p>
        //   </div>
        <ChangedFile 
            fileName={modifiedFile}
            getSelectedChangedFile={this.props.getSelectedChangedFile}
            modificationType={'modify'}
        />
      )}
      { status.deleted.length === 0 ? '' : status.deleted.map((deletedFile) => 
    //   <div className='changedFiles-staging-area'>
    //         <input type='checkbox'></input>
    //         <p onClick={this.props.getSelectedChangedFile.bind(this, deletedFile, 'delete')}>{deletedFile}[-]</p>
    //       </div>
            <ChangedFile 
                fileName={deletedFile}
                getSelectedChangedFile={this.props.getSelectedChangedFile}
                modificationType={'delete'}
            />
      )}
      </>
    );
  }
}

export default CreateCommits;
