import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import Youtube from 'youtube-api';
import getYouTubeId from 'get-youtube-id';
import Post from './models/post';
import Video from './models/video';

const router = new Router();

// get: /api/videos
router.get('/', (req, res, next) => {
  Video
    .find({})
    .sort({date: 'desc'})
    .populate('_user')
    .exec((err, videos) => {
      if (err) return next(err);

      res.send(videos);
    });
});

// post: /api/videos/youtube
router.post('/youtube', authenticateToken, (req, res, next) => {
  const user = req.user;
  const youtubeURL = req.body.url;
  const youtubeId = getYouTubeId(youtubeURL);
  const tags = req.body.tags.split(' ');
  tags.shift() // remove first empty element

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

    const video = new Video({
      _user: user._id,
      title: snippet.title,
      url: youtubeURL,
      provider: 'youtube',
      provider_id: youtubeId,
      thumbnails: snippet.thumbnails,
      tags: tags,
    });

    video.save((err) => {
      if (err) return next(err);

      video._user = user;
      res.send(video);
    });

    const post = new Post({
      _user: user._id,
      _video: video._id,
    });

    post.save((err) => {
      if (err) return next(err);
    });
  });
});

module.exports = router;
