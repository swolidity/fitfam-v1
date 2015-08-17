import { Route, DefaultRoute } from 'react-router';
import React from 'react';

import App from './components/App/App';
import FrontPage from './components/FrontPage/FrontPage';
import About from './components/About/About';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import UserProfile from './components/UserProfile/UserProfile';
import UserInfo from './components/UserInfo/UserInfo';
import UserPhotos from './components/UserPhotos/UserPhotos';
import UserVideos from './components/UserVideos/UserVideos';
import UserSongs from './components/UserSongs/UserSongs';
import UserFollowers from './components/UserFollowers/UserFollowers';
import UserFollowing from './components/UserFollowing/UserFollowing';

export default (
  <Route handler={App} path="/">
    <DefaultRoute name="front-page" handler={FrontPage} />
    <Route name="about" handler={About} path="/about" />

    <Route handler={Login} name="login" path="/login" />
    <Route handler={Signup} name="signup" path="/signup" />

    // user profile
    <Route name="user-profile" handler={UserProfile} path="/:username">
      <DefaultRoute name="user-info" handler={UserInfo} />
      <Route name="user-photos" handler={UserPhotos} path="photos" />
      <Route name="user-videos" handler={UserVideos} path="videos" />
      <Route name="user-songs" handler={UserSongs} path="songs" />
      <Route name="user-followers" handler={UserFollowers} path="followers" />
      <Route name="user-following" handler={UserFollowing} path="following" />
    </Route>
  </Route>
);
