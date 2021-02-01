const mongoose = require('mongoose');

// before() is executed once before all tests //
before((done) => {
  // mongoose.connect('mongodb://192.168.254.121:27017/users_test', {
  mongoose.connect('mongodb://localhost/users_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});


beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done();
  });
});
