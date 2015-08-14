import UserFollowersActions from '../actions/UserFollowersActions';
import http from 'axios';

const UserFollowersSource = {
  fetchFollowers: {
    remote(state, userID) {
      return http.get('/api/follows/followers/' + userID)
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
    success: UserFollowersActions.receiveFollowers,
    error: UserFollowersActions.receiveFollowersFailed,
  },
};

module.exports = UserFollowersSource;
