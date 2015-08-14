import { Router } from 'express';

const router = new Router();

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/users', require('./users'));
//router.use('/chat', require('./chat'));
router.use('/photos', require('./photos'));
router.use('/videos', require('./videos'));
router.use('/songs', require('./songs'));
router.use('/follows', require('./follows'));

module.exports = router;
