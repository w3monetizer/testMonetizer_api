const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.254.121:27017/users_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done();
  });
});
