/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
var filePath;
export class BranchModal extends Component {
  state = {
    successMessage: '',
    branches: [],
    selectedBranch: 'master',
    commits: '',
    filePath: '',
    newBranch: '',
    mergeFromBranch: ''
  };
  pushRepo = () => {
    let git = require('simple-git')(filePath);
    git.listRemote(['--get-url'], (err, data) => {
      if (!err) {
        console.log('Remote url for repository at ' + __dirname + ':');
        console.log(data);
      } else {
        this.setState({ successMessage: 'Please Add Remote Before Push' });
      }
    });
    this.setState({ successMessage: 'pushing...' });
    git.push(['-u', 'origin', this.state.selectedBranch], (err, results) => {
      this.setState({ successMessage: 'pushed succesfully !' });
      if (!err) {
        console.log(results);
      }
    });
  };
  pullRepo = () => {
    console.log(this.state.branch);
    let git = require('simple-git')(filePath);
    git.listRemote(['--get-url'], (err, data) => {
      if (!err) {
        console.log(data);
      } else {
        this.setState({ successMessage: 'Please Add Remote Before Pull' });
      }
    });
    this.setState({ successMessage: 'pulling...' });
    git.pull(['-u', 'origin', this.state.selectedBranch], (err, results) => {
      this.setState({ successMessage: 'pulled succesfully !' });
      if (!err) {
        console.log(results);
      }
    });
  };
  onInputChange = e => {
    this.setState({ newBranch: e.target.value });
  };
  selectMergeFromBranch = e => {
    this.setState({ mergeFromBranch: e.target.value });
  };
  onChange = async e => {
    if (this.props.filePath) {
      if (this.props.modal !== 'merge-modal') {
        console.log('hello world');
        const git = require('simple-git')(this.state.filePath);
        await this.setState({ selectedBranch: e.target.value });
        git.checkout(this.state.selectedBranch).then(() => {
          git.log(async (err, results) => {
            await this.setState({ commits: results.all });
          });
        });
      }
    }
  };
  mergeBranch = () => {
    let git = require('simple-git')(filePath);
    this.setState({ successMessage: 'merging in progress...' });
    console.log(this.state.mergeFromBranch);
    console.log(this.state.selectedBranch);
    git
      .mergeFromTo(this.state.mergeFromBranch, this.state.selectedBranch, (err, result) =>
        err ? console.log(err) : console.log(result)
      )
      .merge((err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
        }
      });
  };
  createNewBranch = () => {
    const git = require('simple-git')(filePath);
    git.checkoutBranch(this.state.newBranch, 'master', (err, results) => {
      if (err) {
        console.log('The following error Ocurred:', err);
      } else {
        this.setState({ successMessage: 'Branch created successfully' });
        var joined = this.state.branches.concat(this.state.newBranch);
        this.setState({ branches: joined });
      }
    });
  };
  async componentWillReceiveProps(nextprops) {
    if (this.state.commits === '') {
      await this.setState({ filePath: nextprops.filePath, commits: nextprops.history });
    }
    filePath = this.state.filePath;
    const git = require('simple-git')(filePath);
    git.branchLocal((err, branches) => this.setState({ branches: branches.all }));
  }
  render() {
    if (this.props.modal === 'branch-modal') {
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
          <p>You can also push the Branches</p>
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
            <a
              className="modal-close waves-effect waves-green btn-flat"
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.updateCommits(this.state.selectedBranch);
              }}
            >
              OK
            </a>
          </div>
        </div>
      );
    } else if (this.props.modal === 'publish-modal') {
      return (
        <div id="modal1" className={`modal + ${this.props.modalDisplayClass}`}>
          <div className="modal-content white">
            <h4>Publish</h4>
          </div>
          <span className="new-branch-text">Before Pushing Set the Remote using SSH</span>
          <br />
          <br />{' '}
          <div className="input-field col s8 branch-name-input center-align">
            <a
              onClick={this.pushRepo}
              className="waves-effect waves-light btn-small blue darken-2 white-text"
            >
              <i className="material-icons right">add_circle</i>
              Push
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
            <a
              className="modal-close waves-effect waves-green btn-flat"
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.updateCommits(this.state.selectedBranch);
              }}
            >
              OK
            </a>
          </div>
        </div>
      );
    } else if (this.props.modal === 'pull-modal') {
      return (
        <div id="modal1" className={`modal + ${this.props.modalDisplayClass}`}>
          <div className="modal-content white">
            <h4>Pull from repo</h4>
          </div>
          <span className="new-branch-text">Before Pulling Set the Remote using SSH</span>
          <br />
          <br />
          <div className="input-field col s12">
            <select onChange={this.onChange} className="choose-branch">
              <option value="" disabled selected>
                Choose your branch to pull into
              </option>
              {this.state.branches.map(branch => (
                <option>{branch}</option>
              ))}
            </select>
          </div>{' '}
          <div className="input-field col s8 branch-name-input center-align">
            <a
              onClick={this.pullRepo}
              className="waves-effect waves-light btn-small blue darken-2 white-text"
            >
              <i className="material-icons right">add_circle</i>
              Pull
            </a>
            <p>{this.state.successMessage}</p>
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
            <a
              className="modal-close waves-effect waves-green btn-flat"
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.updateCommits(this.state.selectedBranch);
              }}
            >
              OK
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div id="modal1" className={`modal + ${this.props.modalDisplayClass}`}>
          <div className="modal-content white">
            <h4>Merge</h4>
          </div>
          <span className="new-branch-text">Before Merging Set the Remote using SSH</span>
          <br />
          <br />
          <br />
          <p className="merge-branch-name">
            Merge into: <span className="selected-branch"><span className="branch-name">{this.state.selectedBranch}</span></span>
          </p>
          <div className="input-field col s12">
            <select onChange={this.selectMergeFromBranch} className="choose-branch">
              <option value="" disabled selected>
                Choose Branch to Merge
              </option>
              {this.state.branches.map(branch => (
                <option>{branch}</option>
              ))}
            </select>
          </div>{' '}
          <div className="input-field col s8 branch-name-input center-align">
            <a
              onClick={this.mergeBranch}
              className="waves-effect waves-light btn-small blue darken-2 white-text"
            >
              <i className="material-icons right">add_circle</i>
              Merge
            </a>
            <p>{this.state.successMessage}</p>
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
            <a
              className="modal-close waves-effect waves-green btn-flat"
              onClick={() => {
                this.props.toggleOverlay();
                this.props.toggleModalClass();
                this.props.updateCommits(this.state.selectedBranch);
              }}
            >
              OK
            </a>
          </div>
        </div>
      );
    }
  }
}

export default BranchModal;
