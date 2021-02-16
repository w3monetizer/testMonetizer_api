const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  description: String,
  sheet: [[String]],
  testSheet: [
    ['A', 'B', 'C'],
    ['1 + 1', '=', '?']
  ]
});

module.exports = PostSchema;
