const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
  title: String,
  content: String,
});

module.exports = mongoose.model('Notifications', notificationsSchema);