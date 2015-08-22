import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import Like from './models/like';
import Post from './models/post';

const router = new Router();

// post: /api/likes
router.post('/', authenticateToken, (req, res, next) => {
  const userID = req.body.user_id;
  const postID = req.body.post_id;

  const like = new Like({
    _user: userID,
    _post: postID,
  });

  like.save((err) => {
    if (err) return next(err);

    Post.findById(postID, (err, post) => {
      if (err) return next(err);

      post.likes = post.likes + 1;
      post.save();
    });

    res.send(true);
  });
});

module.exports = router;
