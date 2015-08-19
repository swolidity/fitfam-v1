import UserPostsActions from '../actions/UserPostsActions';
import http from 'axios';

const UserPostsSource = {
  fetchPosts: {
    remote(state, userID) {
      return http.get('/api/users/' + userID + '/posts')
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
    success: UserPostsActions.fetchPostsSuccess,
    error: UserPostsActions.fetchPostsError,
  },
};

module.exports = UserPostsSource;
