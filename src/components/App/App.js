import React from 'react';
import Header from '../Header/Header.js';

require('./App.scss');

class App extends React.Component {
  render() {
    let wrapperClassNames = 'app-wrapper';


    return (
      <div>
        <Header />

        <div className={wrapperClassNames}>

          <div className="app-main">
            {this.props.children}
          </div>
        </div>

      </div>
    );
  }
}


export default App;
