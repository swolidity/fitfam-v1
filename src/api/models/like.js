import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
  _user: {
    type: String,
    ref: 'User',
    required: true,
  },
  _post: {
    type: String,
    ref: 'Post',
    required: true,
  },
});

LikeSchema.index({ _user: 1, _post: 1 }, { unique: true });

module.exports = mongoose.model('Like', LikeSchema);
