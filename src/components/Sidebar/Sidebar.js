import React from 'react';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';

require('./Sidebar.scss');

class Sidebar extends React.Component {
  render() {
    return (
      <div id="sidebar">
        <YouTubePlayer />
      </div>
    );
  }
}

module.exports = Sidebar;
