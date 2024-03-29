import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import Youtube from 'youtube-api';
import getYouTubeId from 'get-youtube-id';
import Post from './models/post';
import Song from './models/song';

const router = new Router();

// get: /api/songs
router.get('/', (req, res, next) => {
  Song
    .find({})
    .sort({date: 'desc'})
    .populate('_user')
    .exec((err, songs) => {
      if (err) return next(err);

      res.send(songs);
    });
});

// post: /api/songs/youtube
router.post('/youtube', authenticateToken, (req, res, next) => {
  const user = req.user;
  const youtubeURL = req.body.url;
  const youtubeId = getYouTubeId(youtubeURL);
  const genre = req.body.genre;
  let tags;

  if (req.body.tags.length) {
    tags = req.body.tags.split(' ');
  } else {
    tags = [];
  }

  Youtube.authenticate({
    type: 'key',
    key: 'AIzaSyBBaqCVaHQ504_zNETltZV4qZtVQCVRbvU',
  });

  Youtube.videos.list({
    part: 'id, snippet',
    id: youtubeId,
  }, (err, data) => {
    if (err) return next(err);

    const snippet = data.items[0].snippet;

    const song = new Song({
      _user: user._id,
      title: snippet.title,
      url: youtubeURL,
      provider: 'youtube',
      provider_id: youtubeId,
      thumbnails: snippet.thumbnails,
      _genre: genre,
      tags: tags,
    });

    song.save((err) => {
      if (err) return next(err);

      song._user = user;
      res.send(song);
    });

    const post = new Post({
      _user: user._id,
      type: 'song',
      _song: song._id,
    });

    post.save((err) => {
      if (err) return next(err);
    });
  });
});

module.exports = router;
