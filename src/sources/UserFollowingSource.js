import UserFollowingActions from '../actions/UserFollowingActions';
import http from 'axios';

const UserFollowingSource = {
  fetchFollowing: {
    remote(state, userID) {
      return http.get('/api/follows/following/' + userID)
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
    success: UserFollowingActions.receiveFollowing,
    error: UserFollowingActions.receiveFollowingFailed,
  },
};

module.exports = UserFollowingSource;
