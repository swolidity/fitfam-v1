import { Router } from 'express';
import User from './models/user';
import Post from './models/post';
import Photo from './models/photo';
import Video from './models/video';
import Song from './models/song';
import Like from './models/like';
import Genre from './models/genre';
import SongPlaylist from './models/song_playlist';
import Workout from './models/workout';
import Follow from './models/follow';
import authenticateToken from './middleware/authenticate-token';
import _ from 'lodash';

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
    .populate('profile_song')
    .exec((err, user) => {
      if (err) return next(err);

      const options = {
        path: 'profile_song._user',
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

// get: /api/users/:id/posts
router.get('/:id/posts', (req, res, next) => {
  const userID = req.params.id;
  const skip = req.query.skip;

  Post
    .find({_user: userID})
    .sort({date: 'desc'})
    .skip(skip)
    .limit(20)
    .populate('_user _posted_by _photo _video _song _text')
    .exec((err, posts) => {
      if (err) return next(err);

      res.send({
        user_id: userID,
        posts: posts,
        skip: skip,
      });
    });
});


// get: /api/users/:id/videos
router.get('/:id/videos', (req, res, next) => {
  const userID = req.params.id;
  const query = req.query.q;
  const qx = new RegExp(query, 'i');

  const find = {
    _user: userID,
    title: qx,
  };

  if (query && query.indexOf('#') !== -1) {
    const tags = query.split('#');
    tags.shift();
    //find.title.replace('/(#[a-z0-9][a-z0-9\-_]*)/ig', '');
    delete find.title;
    find.tags = { $all: tags };
  }

  Video.find(find)
    .sort({date: 'desc'})
    .populate('_user')
    .exec((err, videos) => {
      if (err) return next(err);

      res.send({
        user_id: userID,
        videos: videos,
      });
    });
});

// post: /api/users/:id/songs
router.post('/:id/songs', (req, res, next) => {
  const userID = req.params.id;
  const query = req.body.q;
  const genreSlug = req.body.genre;
  const qx = new RegExp(query, 'i');

  const find = {
    _user: userID,
    title: qx,
  };

  if (query && query.indexOf('#') !== -1) {
    const tags = query.split('#');
    tags.shift();
    //find.title.replace('/(#[a-z0-9][a-z0-9\-_]*)/ig', '');
    delete find.title;
    find.tags = { $all: tags };
  }

  if (genreSlug) {
    Genre.findOne({slug: genreSlug}, (err, genre) => {
      if (err) return next(err);

      find._genre = genre._id;

      Song.find(find)
        .sort({date: 'desc'})
        .populate('_user')
        .exec((err, songs) => {
          if (err) return next(err);

          res.send({
            user_id: userID,
            songs: songs,
          });
        });
    });
  } else {
    Song.find(find)
      .sort({date: 'desc'})
      .populate('_user _genre')
      .exec((err, songs) => {
        if (err) return next(err);

        res.send({
          user_id: userID,
          songs: songs,
        });
      });
  }
});

// get: /api/users/:id/photos
router.get('/:id/photos', (req, res, next) => {
  const userID = req.params.id;
  Photo.find({_user: userID})
    .sort({date: 'desc'})
    .populate('_user')
    .exec((err, photos) => {
      if (err) return next(err);

      res.send({
        user_id: userID,
        photos: photos,
      });
    });
});

// post: /api/users/:id/liked
router.post('/:id/liked', (req, res, next) => {
  const userID = req.params.id;
  const postID = req.body.post_id;

  Like.count({
    _user: userID,
    _post: postID,
  },
  (err, count) => {
    if (err) return next(err);

    if (count > 0) {
      return res.send(true);
    }

    return res.send(false);
  });
});

// get: /api/users/:id/songs/playlists
router.get('/:id/songs/playlists', (req, res, next) => {
  const userID = req.params.id;

  SongPlaylist.find({_user: userID})
    .exec((err, playlists) => {
      if (err) return next(err);

      res.send({
        user_id: userID,
        playlists: playlists,
      });
    });
});

// get: /api/users/:id/workouts
router.get('/:id/workouts', (req, res, next) => {
  const userID = req.params.id;

  Workout.find({_user: userID})
    .exec((err, workouts) => {
      if (err) return next(err);

      res.send({
        user_id: userID,
        workouts: workouts,
      });
    });
});

// get: /api/users/:id/progress_pics
router.get('/:id/progress_pics', (req, res, next) => {
  const userID = req.params.id;

  Photo.find({_user: userID})
    .sort({date: -1})
    .limit(6)
    .exec((err, photos) => {
      if (err) return next(err);

      res.send(photos);
    });
});

// get: /api/users/:id/post_counts
router.get('/:id/post_counts', (req, res, next) => {
  const userID = req.params.id;
  const done = _.after(5, doSend);

  let postCount;
  let workoutCount;
  let photoCount;
  let videoCount;
  let songCount;

  Post.count({ _user: userID }, (err, c) => {
    if (err) return next(err);

    postCount = c;
    done();
  });

  Workout.count({ _user: userID}, (err, c) => {
    if (err) return next(err);

    workoutCount = c;
    done();
  });

  Photo.count({ _user: userID}, (err, c) => {
    if (err) return next(err);

    photoCount = c;
    done();
  });

  Video.count({ _user: userID}, (err, c) => {
    if (err) return next(err);

    videoCount = c;
    done();
  });

  Song.count({ _user: userID}, (err, c) => {
    if (err) return next(err);

    songCount = c;
    done();
  });

  function doSend() {
    res.send({
      post_count: postCount,
      workout_count: workoutCount,
      photo_count: photoCount,
      video_count: videoCount,
      song_count: songCount,
    });
  }
});

// get: /api/users/:id/follow_count
router.get('/:id/follow_count', (req, res, next) => {
  const userID = req.params.id;
  const done = _.after(2, doSend);

  let followers;
  let following;

  Follow.count({_followed: userID}, (err, c) => {
    if (err) return next(err);

    followers = c;
    done();
  });

  Follow.count({_follower: userID}, (err, c) => {
    if (err) return next(err);

    following = c;
    done();
  });

  function doSend() {
    res.send({
      followers: followers,
      following: following,
    });
  }
});

module.exports = router;
