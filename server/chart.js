const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  id: Number,
  type: String,
  rank: Number,
  data: { content: String },
});

module.exports = mongoose.model('Chart', chartSchema);