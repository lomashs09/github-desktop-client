import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
export class CreateCommit extends Component {
  state = {
    commitMessage: '',
    btnClassName: 'waves-effect waves-light btn blue darken-2 commit-button',
    successMessage: ''
  };
  setCommitMessage = event => {
    this.setState({
      commitMessage: event.target.value
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.mergeConflictsExist !== this.props.mergeConflictsExist) {
      if (this.props.mergeConflictsExist) {
        this.setState({
          btnClassName: 'waves-effect waves-light btn blue darken-2 commit-button disabled'
        });
      } else {
        this.setState({ btnClassName: 'waves-effect waves-light btn blue darken-2 commit-button' });
      }
    }
  }

  render() {
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
          class={this.state.btnClassName}
          onClick={() => {
            this.props.makeCommit.bind(this, this.state.commitMessage);
            this.setState({ commitMessage: '' });
          }}
        >
          Commit
        </a>
        <p>{this.state.successMessage}</p>
      </>
    );
  }
}

export default CreateCommit;
