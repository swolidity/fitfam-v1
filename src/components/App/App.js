import React from 'react';
import { RouteHandler } from 'react-router';
import AppStore from '../../stores/AppStore';
import Header from '../Header/Header.js';
import Sidebar from '../Sidebar/Sidebar.js';

require('./App.scss');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = AppStore.getState();
  }

  componentDidMount() {
    AppStore.listen(this._onChange);
  }

  componentWillUnmount() {
    AppStore.unlisten(this._onChange);
  }

  _onChange = (state) => {
    this.setState(state);
  }

  render() {
    let mainContentClassNames = 'col-xs-12';
    let sidebar;

    if (this.state.sidebar) {
      mainContentClassNames = 'col-xs-12 col-sm-9';

      sidebar = (
        <div className="no-gutter">
          <div id="sidebar-wrapper" className="col-xs-12 col-sm-3 col-sm-offset-9">
            <Sidebar />
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header />

        <div className="app-main">
          <div className="container-fluid">

              {sidebar}

              <div className={mainContentClassNames}>
                <RouteHandler />
              </div>

          </div>
        </div>

      </div>
    );
  }
}


export default App;
