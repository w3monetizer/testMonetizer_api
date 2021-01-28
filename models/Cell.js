const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CellSchema = new Schema({
  values: [String]
});

module.exports = CellSchema;