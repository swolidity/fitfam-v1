import { Router } from 'express';
import Post from './models/post';

const router = new Router();

// get: /api/posts/
router.get('/', (req, res, next) => {
  Post
    .find({})
    .populate('_photo _video _song')
    .exec((err, posts) => {
      if (err) return next(err);

      res.send(posts);
    });
});

module.exports = router;
