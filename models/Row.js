const mongoose = require('mongoose');
const CellSchema = require('./Cell');
const Schema = mongoose.Schema;

const RowSchema = new Schema({
  cells: [CellSchema]
});

module.exports = RowSchema;
