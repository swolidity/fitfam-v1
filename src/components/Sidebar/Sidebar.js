import React from 'react';
import YouTubePlayer from '../YouTubePlayer/YouTubePlayer';

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
