import { Router } from 'express';
import Post from './models/post';
import Text from './models/text';
import authenticateToken from './middleware/authenticate-token';

const router = new Router();

// get: /api/posts/
router.get('/', (req, res, next) => {
  Post
    .find({})
    .sort({date: 'desc'})
    .populate('_user _photo _video _song _text')
    .exec((err, posts) => {
      if (err) return next(err);

      res.send(posts);
    });
});

// post: /api/posts/text
router.post('/text', authenticateToken, (req, res, next) => {
  const postedByUser = req.user;
  const userID = req.body.user_id;
  const content = req.body.content;

  // if it is a user's own status update don't store postedBy
  const postedBy = postedByUser._id === userID ? null : postedByUser._id;

  const text = new Text({
    _user: userID,
    _posted_by: postedBy,
    content: content,
  });

  text.save((err) => {
    if (err) return next(err);

    const post = new Post({
      _user: userID,
      _posted_by: postedBy,
      type: 'text',
      _text: text._id,
    });

    post.save((err) => {
      if (err) return next(err);

      res.send(true);
    });
  })
});

module.exports = router;
