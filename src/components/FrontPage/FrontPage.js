import React from 'react';

require('./FrontPage.scss');

class FrontPage extends React.Component {
  render() {
    return (
      <div className="front-page">
        <div className="container-fluid-5">
          <div className="row">
            <div className="col-xs-12">
              <h1>Welcome to FITFAM!</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = FrontPage;
