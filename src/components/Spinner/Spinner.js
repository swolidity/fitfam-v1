import React from 'react';

require('./Spinner.scss');

class Spinner extends React.Component {
  render() {
    return (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    );
  }
}

module.exports = Spinner;
