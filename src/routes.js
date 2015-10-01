import { Route, DefaultRoute } from 'react-router';
import React from 'react';

import App from './components/App/App';
import FrontPage from './components/FrontPage/FrontPage';
import SongPlaylist from './components/SongPlaylist/SongPlaylist';
import About from './components/About/About';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import UserProfile from './components/UserProfile/UserProfile';
import UserPosts from './components/UserPosts/UserPosts';
import UserPhotos from './components/UserPhotos/UserPhotos';
import UserVideos from './components/UserVideos/UserVideos';
import UserSongs from './components/UserSongs/UserSongs';
import UserSongPlaylists from './components/UserSongPlaylists/UserSongPlaylists';
import UserWorkouts from './components/UserWorkouts/UserWorkouts';
import UserFollowers from './components/UserFollowers/UserFollowers';
import UserFollowing from './components/UserFollowing/UserFollowing';
import WorkoutTracker from './components/WorkoutTracker/WorkoutTracker';
import Workout from './components/Workout/Workout';

// Settings
import Settings from './components/Settings/Settings';
import AccountSettings from './components/AccountSettings/AccountSettings';

export default (
  <Route handler={App} path="/">
    <DefaultRoute name="front-page" handler={FrontPage} />
    <Route name="about" handler={About} path="/about" />

    <Route name="song-playlist" handler={SongPlaylist} path="/songs/playlist/:playlist_id" />

    <Route name="track" handler={WorkoutTracker} path="/track" />

    <Route name="workout" path="/workouts/:workout_id" handler={Workout} />

    <Route handler={Login} name="login" path="/login" />
    <Route handler={Signup} name="signup" path="/signup" />

    // Settings
    <Route name="settings" handler={Settings} path="/settings">
      <DefaultRoute name="default-settings" handler={AccountSettings} />
      <Route name="account-settings" handler={AccountSettings} path="account" />
    </Route>

    // user profile
    <Route name="user-profile" handler={UserProfile} path="/:username">
      <DefaultRoute name="user-posts" handler={UserPosts} />
      <Route name="user-photos" handler={UserPhotos} path="photos" />
      <Route name="user-videos" handler={UserVideos} path="videos" />
      <Route name="user-songs" handler={UserSongs} path="songs" />
      <Route name="user-song-playlists" handler={UserSongPlaylists} path="songs/playlists" />
      <Route name="user-workouts" handler={UserWorkouts} path="workouts" />
      <Route name="user-followers" handler={UserFollowers} path="followers" />
      <Route name="user-following" handler={UserFollowing} path="following" />
    </Route>
  </Route>
);
