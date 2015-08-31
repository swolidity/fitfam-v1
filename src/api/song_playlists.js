import { Router } from 'express';
import authenticateToken from './middleware/authenticate-token';
import Song from './models/song';
import SongPlaylist from './models/song_playlist';
import SongPlaylistXref from './models/song_playlist_xref';

const router = new Router();

// get: /api/songs/playlists/:id
router.get('/:id', (req, res, next) => {
  const playlistID = req.params.id;
  let playlist;
  let user;

  SongPlaylist.findOne({_id: playlistID})
    .populate('_user')
    .exec()
    .then((songPlaylist) => {
      playlist = songPlaylist;
      user = songPlaylist._user;
      return SongPlaylistXref.find({_playlist: songPlaylist._id})
        .populate('_song')
        .exec();
    })
    .then((songXrefs) => {
      songXrefs.forEach((songXref) => {
        songXref._song._user = user;
      });

      res.send({
        playlist: playlist,
        songs: songXrefs,
      });
    })
    .then(null, (err) => {
      next(err);
    });
});

// post: /api/songs/playlists/new
router.post('/new', authenticateToken, (req, res, next) => {
  const name = req.body.name;
  const userID = req.user._id;

  const playlist = new SongPlaylist({
    name: name,
    _user: userID,
  });

  playlist.save((err) => {
    if (err) return next(err);

    res.send(playlist);
  });
});

// post: /api/songs/playlists/add_song
router.post('/add_song', authenticateToken, (req, res, next) => {
  const songID = req.body.song_id;
  const playlistID = req.body.playlist_id;

  const xref = new SongPlaylistXref({
    _song: songID,
    _playlist: playlistID,
  });

  xref.save((err) => {
    if (err) return next(err);

    res.send(xref);
  });
});

module.exports = router;
