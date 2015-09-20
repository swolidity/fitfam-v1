import Router from 'express';
import authenticateToken from './middleware/authenticate-token';
import Exercise from './models/exercise';

const router = new Router();

// get: /api/exercises
router.get('/', (req, res, next) => {
  const q = req.query.q;
  const qx = new RegExp(q, 'i');

  Exercise.find({name: qx})
    .exec((err, exercises) => {
      if (err) return next(err);

      res.send(exercises);
    });
});

// post: /api/exercises
router.post('/', authenticateToken, (req, res, next) => {
  const name = req.body.name;

  const exercise = new Exercise({
    name: name,
  });

  exercise.save((err) => {
    if (err) return next(err);

    res.send(exercise);
  });
});

module.exports = router;
