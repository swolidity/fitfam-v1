import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import User from './models/user';
import jwt_util from './utils/jwt-util';

const router = new Router();

// post: /api/settings/account
router.post('/account', authenticateToken, (req, res, next) => {
  const account = req.body.account;

  User.findOne({_id: req.user._id}, (err, user) => {
    if (err) return next(err);

    user.username = account.username;
    user.full_name = account.full_name;
    user.bio = account.bio;
    user.email = account.email;

    if (account.password) {
      user.password = account.password;
    }

    user.save((err) => {
      if (err) return next(err);

      const userObj = user.toObject(); // convert from instance of Mongoose Model to POJO ( Plain Old Javascript Object )
      delete userObj.password; // remove hashed password from user object before creating the token
      const token = jwt_util.createToken(userObj);

      // return user with token
      res.send(token);
    });
  });
});

module.exports = router;
