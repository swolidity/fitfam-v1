import mongoose from 'mongoose';

const FollowSchema = mongoose.Schema({
  _follower: {
    type: String,
    ref: 'User',
    required: true,
  },
  _followed: {
    type: String,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    'default': Date.now,
  },
});

FollowSchema.index({ _follower: 1, _followed: 1 }, { unique: true });

module.exports = mongoose.model('Follow', FollowSchema);
