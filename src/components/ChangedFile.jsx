import React, { Component } from 'react';
export class ChangedFile extends Component {
  state = {
    checked: true
  };

  toggle = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    if (this.props.status) {
      const staged = this.props.status.staged;
      if (this.props.modificationType === 'add') {
        return (
          <li class="collection-item">
            <label>
              {staged.includes(this.props.fileName) ? (
                <input
                  type="checkbox"
                  checked={this.state.checked}
                  onClick={() => {
                    this.toggle();
                    this.props.addFilesToStagingArea(this.props.fileName, !this.state.checked);
                  }}
                />
              ) : (
                <input
                  type="checkbox"
                  onClick={() => {
                    this.toggle();
                    this.props.addFilesToStagingArea(this.props.fileName, this.state.checked);
                  }}
                />
              )}
              <span></span>
            </label>
            <div className="filename-span">
              <span
                className="file-name"
                onClick={this.props.getSelectedChangedFile.bind(this, this.props.fileName, 'add')}
              >
                {' '}
                {this.props.fileName}{' '}
              </span>
              <span className="changed-type">
                {' '}
                <i class="material-icons">add_box</i>
              </span>
            </div>
          </li>
        );
      } else if (this.props.modificationType === 'modify') {
        return (
          <li class="collection-item">
            <label>
              {staged.includes(this.props.fileName) ? (
                <input
                  type="checkbox"
                  checked={this.state.checked}
                  onClick={() => {
                    this.toggle();
                    this.props.addFilesToStagingArea(this.props.fileName, !this.state.checked);
                  }}
                />
              ) : (
                <input
                  type="checkbox"
                  onClick={() => {
                    this.toggle();
                    this.props.addFilesToStagingArea(this.props.fileName, this.state.checked);
                  }}
                />
              )}

              <span></span>
            </label>
            <div className="filename-span">
              <span
                className="file-name"
                onClick={this.props.getSelectedChangedFile.bind(
                  this,
                  this.props.fileName,
                  'modify'
                )}
              >
                {' '}
                {this.props.fileName}{' '}
              </span>
              <span className="changed-type">
                <i class="material-icons">edit</i>
              </span>
            </div>
          </li>
        );
      } else if (this.props.modificationType === 'delete') {
        return (
          <div className="checkbox-and-changed-file">
            <p>
              <label>
                {staged.includes(this.props.fileName) ? (
                  <input
                    type="checkbox"
                    checked={this.state.checked}
                    onClick={() => {
                      this.toggle();
                      this.props.addFilesToStagingArea(this.props.fileName, !this.state.checked);
                    }}
                  />
                ) : (
                  <input
                    type="checkbox"
                    onClick={() => {
                      this.toggle();
                      this.props.addFilesToStagingArea(this.props.fileName, this.state.checked);
                    }}
                  />
                )}

                <span></span>
              </label>
            </p>{' '}
            <div className="row">
              <div className="col s12 m12">
                <div className="card-panel white hoverable">
                  <input type="checkbox"></input>
                  <span className="black-text">{this.props.fileName}[-]</span>
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
