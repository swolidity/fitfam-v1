import FollowActions from '../actions/FollowActions';
import LoginStore from '../stores/LoginStore';
import http from 'axios';

const FollowSource = {
  fetchIsFollowing: {
    remote(state, followerID, followedID) {
      return http.post('/api/follows/check', {
        follower_id: followerID,
        followed_id: followedID,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err.data);
      });
    },
    local() {
      return null;
    },
    success: FollowActions.fetchIsFollowingSuccess,
    error: FollowActions.fetchIsFollowingFailed,
  },

  follow: {
    remote(state, followerID, followedID) {
      const token = LoginStore.getToken();
      return http.post('/api/follows/follow', {
        follower_id: followerID,
        followed_id: followedID,
      },
      {
        headers: { 'Authorization': 'JWT ' + token },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err.data);
      });
    },
    local() {
      return null;
    },
    success: FollowActions.followSuccess,
    error: FollowActions.followFailed,
  },

  unfollow: {
    remote(state, followerID, followedID) {
      const token = LoginStore.getToken();
      return http.post('/api/follows/unfollow', {
        follower_id: followerID,
        followed_id: followedID,
      },
      {
        headers: { 'Authorization': 'JWT ' + token },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err.data);
      });
    },
    local() {
      return null;
    },
    success: FollowActions.unfollowSuccess,
    error: FollowActions.unfollowFailed,
  },
};

module.exports = FollowSource;
