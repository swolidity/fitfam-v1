import FrontPageActions from '../actions/FrontPageActions';
import http from 'axios';

const FrontPageSource = {
  fetchPosts: {
    remote() {
      return http.get('/api/posts')
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
    success: FrontPageActions.fetchPostsSuccess,
    error: FrontPageActions.fetchPostsError,
  },
};

module.exports = FrontPageSource;
