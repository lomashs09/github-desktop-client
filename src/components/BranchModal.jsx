/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
var filePath;
export class BranchModal extends Component {
  state = {
    successMessage: '',
    branches: [],
    selectedBranch: '',
    commits: '',
    filePath: '',
    newBranch: ''
  };
  onInputChange = e => {
    this.setState({ newBranch: e.target.value });
  };
  onChange = async e => {
    if (this.props.filePath) {
      const git = require('simple-git')(this.state.filePath);
      await this.setState({ selectedBranch: e.target.value });
      git.checkout(this.state.selectedBranch).then(() => {
        git.log(async (err, results) => {
          await this.setState({ commits: results.all });
        });
      });
    }
  };
  componentDidMount() {
    const git = require('simple-git')(filePath);
    git.log((err, results) => {
      this.setState({ latestHash: results.all[0].hash });
    });
  }
  createNewBranch = () => {
    const git = require('simple-git')(filePath);
    git.checkoutBranch(this.state.newBranch, 'master', (err, results) => {
      if (err) {
        console.log('The following error Ocurred:',err);
      } else {
        this.setState({ successMessage: 'Branch created successfully' });
        var joined = this.state.branches.concat(this.state.newBranch);
        this.setState({ branches: joined });
      }
    });
  };
  async componentWillReceiveProps(nextprops) {
    await this.setState({ filePath: nextprops.filePath, commits: nextprops.history });
    filePath = this.state.filePath;
    const git = require('simple-git')(this.state.filePath);
    git.branchLocal((err, branches) => this.setState({ branches: branches.all }));
  }
  render() {
    return (
      <div id="modal1" className={`modal + ${this.props.modalDisplayClass}`}>
        <div className="modal-content white">
          <h4>BRANCHES</h4>
        </div>
        <span className="new-branch-text">Create New Branch</span>
        <div className="input-field col s8 branch-name-input">
          <input
            onChange={this.onInputChange}
            placeholder="Enter branch name"
            id="first_name"
            type="text"
            className="validate"
          />
          <a
            onClick={this.createNewBranch}
            className="waves-effect waves-light btn-small blue darken-2 white-text"
          >
            <i className="material-icons right">add_circle</i>
            CREATE
          </a>
          <p>{this.state.successMessage}</p>
        </div>
        <div className="input-field col s12">
          <select onChange={this.onChange} className="choose-branch">
            <option value="" disabled selected>
              Choose your branch
            </option>
            {this.state.branches.map(branch => (
              <option>{branch}</option>
            ))}
          </select>
        </div>
        <div className="modal-footer">
          <a
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => {
              this.props.toggleOverlay();
              this.props.toggleModalClass();
            }}
          >
            CLOSE
          </a>
        </div>
      </div>
    );
  }
}

export default BranchModal;
