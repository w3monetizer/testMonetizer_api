const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters']
  },
  rows: [[{ type: String }]],
  a: [
    ['A', 'B', 'C'],
    ['1 + 1', '=', '?']
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Sheet', SheetSchema);