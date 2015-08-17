import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import Follow from './models/follow';

const router = new Router();

router.post('/check', (req, res, next) => {
  const followerID = req.body.follower_id;
  const followedID = req.body.followed_id;

  Follow.count({
    _follower: followerID,
    _followed: followedID,
  },
  (err, count) => {
    if (err) return next(err);

    if (count > 0) {
      return res.send(followedID);
    }

    return res.send(false);
  });
});

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

router.get('/followers/:id', (req, res, next) => {
  const userID = req.params.id;

  Follow
    .find({_followed: userID})
    .populate('_follower')
    .exec((err, followers) => {
      if (err) return next(err);

      return res.send(followers);
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

    res.send(follow._followed);
  });
});

router.post('/unfollow', authenticateToken, (req, res, next) => {
  const followerID = req.user._id;
  const followedID = req.body.followed_id;

  Follow.remove({
    _follower: followerID,
    _followed: followedID},
  (err) => {
    if (err) return next(err);

    res.send(followedID);
  });
});
module.exports = router;
