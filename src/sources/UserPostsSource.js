import UserPostsActions from '../actions/UserPostsActions';
import http from 'axios';

const UserPostsSource = {
  fetchPosts: {
    remote(state, userID) {
      let skip = state.skip + state.limit;

      if (state.userID !== userID) {
        skip = 0;
      }

      return http.get('/api/users/' + userID + '/posts?skip=' + skip)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return Promise.reject(err.data);
      });
    },
    local(state, userID, skip) {
      if (state.userID === userID && !skip) {
        console.log('local');
        return {
          user_id: userID,
          posts: state.posts,
          skip: skip,
        };
      }
      return null;
    },
    success: UserPostsActions.fetchPostsSuccess,
    error: UserPostsActions.fetchPostsError,
  },
};

module.exports = UserPostsSource;
