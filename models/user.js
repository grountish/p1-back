const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String},
  email: {type: String},
  password: {type: String},
  imgPath: {type: String},
  aboutMe: {type: String},
  role: {type: String}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;