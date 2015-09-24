import { Router } from 'express';

const router = new Router();

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/users', require('./users'));
//router.use('/chat', require('./chat'));
router.use('/posts', require('./posts'));
router.use('/photos', require('./photos'));
router.use('/videos', require('./videos'));
router.use('/songs', require('./songs'));
router.use('/songs/playlists', require('./song_playlists'));
router.use('/follows', require('./follows'));
router.use('/likes', require('./likes'));
router.use('/genres', require('./genres'));
router.use('/exercises', require('./exercises'));
router.use('/track', require('./track'));
router.use('/workouts', require('./workouts'));

module.exports = router;
