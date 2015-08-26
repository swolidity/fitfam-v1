import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import Post from './models/post';
import Photo from './models/photo';

const router = new Router();

// get: /api/photos
router.get('/', (req, res, next) => {
  Photo
    .find({})
    .sort({date: 'desc'})
    .populate('_user')
    .exec((err, photos) => {
      if (err) return next(err);

      res.send(photos);
    });
});

// post: /api/photos
router.post('/', authenticateToken, (req, res, next) => {
  const user = req.user;
  const url = req.body.url;
  const caption = req.body.caption;

  const photo = new Photo({
    _user: user._id,
    url: url,
    caption: caption,
  });

  photo.save((err) => {
    if (err) return next(err);

    photo._user = user;
    res.send(photo);
  });

  const post = new Post({
    _user: user._id,
    type: 'photo',
    _photo: photo._id,
  });

  post.save((err) => {
    if (err) return next(err);
  });
});

module.exports = router;
