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
router.use('/follows', require('./follows'));
router.use('/likes', require('./likes'));
router.use('/genres', require('./genres'));

module.exports = router;
