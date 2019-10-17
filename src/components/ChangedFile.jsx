import React, { Component } from 'react';
export class ChangedFile extends Component {
    state = {
        checked: true
    }

    toggle = () => {
        this.setState({ checked: !this.state.checked })
      }
    
    render() {
        console.log(this.props.status)
        if(this.props.status) {
            const staged = this.props.status.staged;
            if (this.props.modificationType === 'add') {
                return (
                    <div className='checkbox-and-changed-file'>
            <p>
              <label>
              {staged.includes(this.props.fileName) ? <input type="checkbox" checked={this.state.checked} onClick={() => {this.toggle(); this.props.addFilesToStagingArea(this.props.fileName, !this.state.checked)}}/> : <input type="checkbox" onClick={() => {this.toggle(); this.props.addFilesToStagingArea(this.props.fileName, this.state.checked)}}/>}
                {/* <input type="checkbox" onClick={() => {this.toggle(); this.props.addFilesToStagingArea(this.props.fileName, this.state.checked)}}/> */}
                <span></span>
              </label>
            </p>
                      <div
                        className="row" 
                      >
                        <div className="col s12 m12">
                          <div className="card-panel white hoverable">
                            <span className="black-text">
                                <p onClick={this.props.getSelectedChangedFile.bind(this, this.props.fileName, 'add')}>{this.props.fileName}[+]</p>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
            } else if(this.props.modificationType === 'modify') {
                return (
                    <div className='checkbox-and-changed-file'>
        <p>
              <label>
              {staged.includes(this.props.fileName) ? <input type="checkbox" checked={this.state.checked} onClick={() => {this.toggle(); this.props.addFilesToStagingArea(this.props.fileName, !this.state.checked)}}/> : <input type="checkbox" onClick={() => {this.toggle(); this.props.addFilesToStagingArea(this.props.fileName, this.state.checked)}}/>}
        
                {/* <input type="checkbox" onClick={() => {this.toggle(); this.props.addFilesToStagingArea(this.props.fileName, this.state.checked)}}/> */}
                <span></span>
              </label>
            </p>              <div
                        className="row"
                      >
                        <div className="col s12 m12">
                          <div className="card-panel white hoverable">
                            <span className="black-text" onClick={this.props.getSelectedChangedFile.bind(this, this.props.fileName, 'modify')}>{this.props.fileName}[M]</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
            } else if(this.props.modificationType === 'delete'){
                return (
                    <div className='checkbox-and-changed-file'>
        <p>
              <label>
              {staged.includes(this.props.fileName) ? <input type="checkbox" checked={this.state.checked} onClick={() => {this.toggle(); this.props.addFilesToStagingArea(this.props.fileName, !this.state.checked)}}/> : <input type="checkbox" onClick={() => {this.toggle(); this.props.addFilesToStagingArea(this.props.fileName, this.state.checked)}}/>}
        
                {/* <input type="checkbox" onClick={() => {this.toggle(); this.props.addFilesToStagingArea(this.props.fileName, this.state.checked)}}/> */}
                <span></span>
              </label>
            </p>              <div
                        className="row"
                      >
                        <div className="col s12 m12">
                          <div className="card-panel white hoverable">
                            <input type='checkbox'></input>
                            <span className="black-text" >{this.props.fileName}[-]</span>
                            {/* onClick={this.props.getSelectedChangedFile.bind(this, this.props.fileName, 'delete')} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
            }
            
        
        } else {
            return null;
        }
  }
}
export default ChangedFile;
