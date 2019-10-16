import React, { Component } from 'react';

export class ChangedFile extends Component {
  render() {
    if (this.props.modificationType === 'add') {
        return (
            <div>
              <div
                className="row" 
              >
                <div className="col s12 m12">
                  <div className="card-panel white hoverable">
                    <input type='checkbox'></input>
                    <span className="black-text">
                        {/* <input type='checkbox'></input> */}
                        <p>
                            <label>
                            <input type="checkbox" onClick={()=>{console.log("This works")}}/>
                            </label>
                        </p>
                        <p onClick={this.props.getSelectedChangedFile.bind(this, this.props.fileName, 'add')}>{this.props.fileName}[+]</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
    } else if(this.props.modificationType === 'modify') {
        return (
            <div>
              <div
                className="row"
              >
                <div className="col s12 m12">
                  <div className="card-panel white hoverable">
                    <input type='checkbox'></input>
                    <span className="black-text" onClick={this.props.getSelectedChangedFile.bind(this, this.props.fileName, 'modify')}>{this.props.fileName}[M]</span>
                  </div>
                </div>
              </div>
            </div>
          );
    } else {
        return (
            <div>
              <div
                className="row"
              >
                <div className="col s12 m12">
                  <div className="card-panel white hoverable">
                    <input type='checkbox'></input>
                    <span className="black-text" onClick={this.props.getSelectedChangedFile.bind(this, this.props.fileName, 'delete')}>{this.props.fileName}[-]</span>
                  </div>
                </div>
              </div>
            </div>
          );
    }
    
  }
}

export default ChangedFile;

/*
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
*/