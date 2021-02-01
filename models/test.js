const mongoose = require('mongoose');
const ScriptSchema = require('./script');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  title: {
    type: String,
    validate: {
      validator: (name) => name.length > 3,
      message: 'Name must be longer than 3 characters.' // Message for the user //
    },
    required: [true, 'Name is required.'], // User freindly message //
  },
  scripts: [ScriptSchema],  // embedded scripts property as code reference - To use later for Friends, Services, while blogPosts ~ Projects ? //
  likes: Number,
  blogScripts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogScript'
  }]
});

// Virtual Props declarations - using keyword: virtual ~ Computed Props //
UserSchema.virtual('scriptCount').get(function () {
  return this.scripts.length;
});

// delete user blogScripts before deleting the test //
TestSchema.pre('remove', function (next) {  // using function because the model is available as this //
  const BlogScript = mongoose.model('blogScript');
  // this === test //

  BlogScript.remove({ _id: { $in: this.blogScripts } })
    .then(() => next()); // use next to ensure the next middleware is called //
});

const Test = mongoose.model('test', TestSchema);

module.exports = Test;