import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import Genre from './models/genre';

const router = new Router();

// get: /api/genres
router.get('/', (req, res, next) => {
  Genre.find({}, (err, genres) => {
    if (err) return next(err);

    res.send(genres);
  });
});

// post: /api/genres
router.post('/', authenticateToken, (req, res, next) => {
  const name = req.body.name;
  const slug = req.body.slug;

  const genre = new Genre({
    name: name,
    slug: slug,
  });

  genre.save((err) => {
    if (err) return next(err);

    res.send(genre);
  });
});

module.exports = router;
