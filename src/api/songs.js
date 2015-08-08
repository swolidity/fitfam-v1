import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import Youtube from 'youtube-api';
import getYouTubeId from 'get-youtube-id';
import Song from './models/song';

const router = new Router();

// post: /api/songs/youtube
router.post('/youtube', authenticateToken, (req, res, next) => {
  const user = req.user;
  const youtubeURL = req.body.url;
  const youtubeId = getYouTubeId(youtubeURL);

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
    });

    song.save((err) => {
      if (err) return next(err);

      song._user = user;
      res.send(song);
    });
  });
});

module.exports = router;