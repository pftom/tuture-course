const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  id: Number,
  name: String,
  signature: String,
  avatar: String,
  following: [Number],
  follower: [Number],
  ownCharts: [Number],
  favoriteCharts: [Number],
  collectCharts: [Number],
});

module.exports = mongoose.model('Users', usersSchema);