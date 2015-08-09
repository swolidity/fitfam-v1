import { Router } from 'express';

const router = new Router();

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/users', require('./users'));
router.use('/chat', require('./chat'));
router.use('/videos', require('./videos'));
router.use('/songs', require('./songs'));

module.exports = router;
