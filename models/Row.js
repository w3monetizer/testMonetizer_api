const mongoose = require('mongoose');
const CellSchema = require('./Cell');
const Schema = mongoose.Schema;

const RowSchema = new Schema({
  cells: [{val: String}]
});

module.exports = RowSchema;
