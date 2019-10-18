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
    newBranch: ''
  };
  pushRepo =()=>{
    console.log('branch:',this.state.selectedBranch)
    let git = require('simple-git')(filePath);
  git
    .listRemote(['--get-url'], (err, data) => {
        if (!err) {
            console.log('Remote url for repository at ' + __dirname + ':');
            console.log(data);
        }
        else{
          this.setState({successMessage:'Please Add Remote Before Push'})
        }
    });
    this.setState({successMessage:'pushing...'})
    git.push(['-u', 'origin', this.state.selectedBranch],(err,results)=>{
      this.setState({successMessage:'pushed succesfully !'})
      if(!err){
      console.log(results)
    }})
  }
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
    if(this.state.commits===''){
      await this.setState({ filePath: nextprops.filePath, commits:nextprops.history });
    }
    filePath = this.state.filePath;
          const git = require('simple-git')(filePath);
          git.branchLocal((err, branches) => this.setState({ branches: branches.all }));
    
    // console.log(this.props.filePath)

  }
  render() {
    if(this.props.modal ==='branch-modal'){
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
              this.props.updateCommits(this.state.selectedBranch)
            }}
          >
            OK
          </a>
        </div>
      </div>
    );
  }
  else{
    return (
      <div id="modal1" className={`modal + ${this.props.modalDisplayClass}`}>
        <div className="modal-content white">
          <h4>Publish</h4>
        </div>
        <span className="new-branch-text">Before Pushing Set the Remote using SSH</span><br /><br />
        {' '}
        <div className="input-field col s8 branch-name-input center-align">
          <a
            onClick={this.pushRepo}
            className="waves-effect waves-light btn-small blue darken-2 white-text"
          >
            <i className="material-icons right">add_circle</i>
            Push
          </a>
          <p >{this.state.successMessage}</p>
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
              this.props.updateCommits(this.state.selectedBranch)
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
