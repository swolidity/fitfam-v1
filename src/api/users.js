import { Router } from 'express';
import User from './models/user';
import Photo from './models/photo';
import Video from './models/video';
import Song from './models/song';
import authenticateToken from './middleware/authenticate-token';

const router = new Router();

// get: /api/users
router.get('/', (req, res) => {
  User.find({})
    .sort({date: 'desc'})
    .exec((err, users) => {
    res.send(users);
  });
});

// get : /api/users/:username
router.get('/:username', (req, res, next) => {
  User
    .findOne({username: req.params.username})
    .select('-password')
    .populate('profileSong')
    .exec((err, user) => {
      if (err) return next(err);

      const options = {
        path: 'profileSong._user',
        model: 'User',
      };

      User.populate(user, options, (err, user) => {
        if (err) return next(err);

        res.send(user);
      });
    });
});

// post: /api/users/edit
router.post('/edit', authenticateToken, (req, res, next) => {
  res.send({ username: req.user.username });
});

// get: /api/users/:id/videos
router.get('/:id/videos', (req, res, next) => {
  const userId = req.params.id;
  const query = new RegExp(req.query.q, 'i');

  Video.find({_user: userId, title: query})
    .sort({date: 'desc'})
    .populate('_user')
    .exec((err, videos) => {
      if (err) return next(err);

      res.send(videos);
    });
});

// get: /api/users/:id/songs
router.get('/:id/songs', (req, res, next) => {
  const userId = req.params.id;
  const query = new RegExp(req.query.q, 'i');

  Song.find({_user: userId, title: query})
    .sort({date: 'desc'})
    .populate('_user')
    .exec((err, songs) => {
      if (err) return next(err);

      res.send(songs);
    });
});

// get: /api/users/:id/photos
router.get('/:id/photos', (req, res, next) => {
  const userId = req.params.id;
  Photo.find({_user: userId})
    .sort({date: 'desc'})
    .populate('_user')
    .exec((err, photos) => {
      if (err) return next(err);

      res.send(photos);
    });
});

module.exports = router;
