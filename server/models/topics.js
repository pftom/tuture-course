const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicsSchema = new Schema({
  title: String,
  selectedPerson: { type: [String], default: [] },
});

module.exports = mongoose.model('Topics', topicsSchema);