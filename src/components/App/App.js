import React from 'react';
import { RouteHandler } from 'react-router';
import Header from '../Header/Header.js';
import Sidebar from '../Sidebar/Sidebar.js';

require('./App.scss');

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />

        <div className="app-main">
          <div className="container-fluid">
            <div className="row">

            <div className="col-xs-3 col-xs-offset-9 fixed">
              <Sidebar />
            </div>

            <div className="col-xs-9">
              <RouteHandler />
            </div>

            </div>
          </div>
        </div>

      </div>
      );
  }
}


export default App;
