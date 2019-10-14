import React, { Component } from 'react';
import Header from './Header';

export default class Show extends Component {
  render() {
    return (
      <>
        <Header />
        <section className="show-details">
          <div className="commits-history">Commit History</div>
          <div className="commit-details">
            <div className="commit-message-overview">Commit Message Overview</div>
            <div className="display-changes">
              <div className="file-changes">File Changes</div>
              <div className="show-changes">Show Changes</div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
