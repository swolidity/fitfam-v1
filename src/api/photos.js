import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import Photo from './models/photo';

const router = new Router();

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
});

module.exports = router;
