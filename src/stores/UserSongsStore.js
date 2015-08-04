import React from 'react';
import alt from '../alt';
import UserSongsActions from '../actions/UserSongsActions';
import UserSongsSource from '../sources/UserSongsSource';

class UserSongsStore {
  constructor() {
    this.songs = [];
    this.playing = null;
    this.err = null;

    this.bindActions(UserSongsActions);
    this.exportAsync(UserSongsSource);
  }

  onReceiveSongs(songs) {
    this.songs = songs;
    this.playing = songs[0];
  }

  onReceiveSongsFailed(err) {
    this.err = err;
  }

  onAddSong(song) {
    this.songs.unshift(song);
    if (!this.playing) this.playing = song;
  }

  onAddSongFailed(err) {
    this.err = err;
  }
}

module.exports = alt.createStore(UserSongsStore, 'UserSongsStore');
