const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  name: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  description: {type: String},
  artist: {type: String},
  urlPath: {type: String},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;