const mongoose = require('mogoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String
});

const User = mogoose.model('user', UserSchema);

module.exports = User;