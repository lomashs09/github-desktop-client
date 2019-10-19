import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export class CreateCommit extends Component {
  state = {
    commitMessage: '',
    buttonActive: true
  };

  setCommitMessage = event => {
    this.setState({
      commitMessage: event.target.value,
    });
  };

  componentDidMount() {
    this.props.mergeConflictsExist ? this.setState({ buttonActive: false }) : this.setState({ buttonActive: true })
  }

  render() {
    if (this.state.buttonActive) {
      return (
        <>
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <textarea
                  id="textarea1"
                  class="materialize-textarea"
                  onChange={this.setCommitMessage}
                ></textarea>
                <label for="textarea1">Commit Message (Required)</label>
              </div>
            </div>
          </form>
  
          <a
            class="waves-effect waves-light btn blue darken-2 commit-button"
            onClick={this.props.makeCommit.bind(this, this.state.commitMessage)}
          >
            Commit
          </a>
        </>
      )
    } else {
      return (
        <>
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <textarea
                  id="textarea1"
                  class="materialize-textarea"
                  onChange={this.setCommitMessage}
                ></textarea>
                <label for="textarea1">Commit Message (Required)</label>
              </div>
            </div>
          </form>
  
          <a
            class="waves-effect waves-light btn blue darken-2 commit-button disabled"
            onClick={this.props.makeCommit.bind(this, this.state.commitMessage)}
          >
            Commit
          </a>
        </>
      )
    }
  }
}

export default CreateCommit;
