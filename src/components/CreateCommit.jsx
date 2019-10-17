import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export class CreateCommit extends Component {
  state = {
    commitMessage: ''
  }

  setCommitMessage = (event) => {
    this.setState({
      commitMessage: event.target.value
    });
  }
  
  render() {
    return (
        <>
        <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <textarea id="textarea1" class="materialize-textarea" onChange={this.setCommitMessage}></textarea>
              <label for="textarea1">Commit Message (Required)</label>
            </div>
          </div>
        </form>
      </div>
      <a class="waves-effect waves-light btn" onClick={this.props.makeCommit.bind(this, this.state.commitMessage)}>Commit</a>
    </>
    );
  }
}

export default CreateCommit;
