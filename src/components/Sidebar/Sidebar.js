import React from 'react/addons';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';
let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

require('./Sidebar.scss');

class Sidebar extends React.Component {
  render() {
    return (
      <ReactCSSTransitionGroup transitionName="slide-in" transitionAppear={true} >
        <div className="no-gutter">
          <div id="sidebar-wrapper" className="col-xs-12 col-sm-3 col-sm-offset-9">
            <div id="sidebar">
              <YouTubePlayer />
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

module.exports = Sidebar;
