import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import Supplement from './models/supplement';

const router = new Router();

// post: /api/supplements/
router.post('/', authenticateToken, (req, res, next) => {
  const name = req.body.name;
  const photo = req.body.photo;

  const supplement = new Supplement({
    name: name,
    photo: photo,
  });

  supplement.save((err) => {
    if (err) return next(err);
  });
});

module.exports = router;
