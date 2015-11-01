import React from 'react';
import { RouteHandler } from 'react-router';
import AppStore from '../../stores/AppStore';
import Header from '../Header/Header.js';
import Sidebar from '../Sidebar/Sidebar.js';

require('./App.scss');

class App extends React.Component {
  static childContextTypes = {
    sidebar: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = AppStore.getState();
  }

  getChildContext = () => {
    return { sidebar: this.state.sidebar };
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
    let wrapperClassNames = 'app-wrapper';

    if (this.state.sidebar) {
      wrapperClassNames = 'app-wrapper sidebar-open';
    }

    return (
      <div>
        <Header />

        <div className={wrapperClassNames}>
          <Sidebar />

          <div className="app-main">
            <RouteHandler />
          </div>
        </div>

      </div>
    );
  }
}


export default App;
