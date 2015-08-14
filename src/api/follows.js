import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import Follow from './models/follow';

const router = new Router();

router.get('/following/:id', (req, res, next) => {
  const userID = req.params.id;

  Follow
    .find({_follower: userID})
    .populate('_followed')
    .exec((err, following) => {
      if (err) return next(err);

      return res.send(following);
    });
});

// post: /api/follows/follow
router.post('/follow', authenticateToken, (req, res, next) => {
  const followerID = req.user._id;
  const followedID = req.body.followed_id;

  const follow = new Follow({
    _follower: followerID,
    _followed: followedID,
  });

  follow.save((err) => {
    if (err) return next(err);

    res.send(follow);
  });
});

module.exports = router;
