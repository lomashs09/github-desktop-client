import React, { Component } from 'react';

export class Commits extends Component {
  render() {
    console.log(this.props.history);
    if (this.props.history === 'No commits yet') {
      return <p />;
    }
    return (
      <div>
        <div
          className="row"
          onClick={() => {
            this.props.getSelectedCommit(this.props.hash);
          }}
        >
          <div className="col s12 m12">
            <div className="card-panel white hoverable">
              <span className="black-text">{this.props.name}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Commits;
