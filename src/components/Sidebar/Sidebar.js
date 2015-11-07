import React from 'react/addons';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';

require('./Sidebar.scss');

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar">
          <YouTubePlayer />
        </div>
      </div>
    );
  }
}

module.exports = Sidebar;
