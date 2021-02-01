const assert = require('assert');

const User = require('../src/user');
// const Test = require('./models/test');

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach;

  beforeEach((done) => {
    // To insert users/(w3)tests for testing // 
    // test1 = new Test({ title: 'Test1'});  // Mongoose creates test in memory //
    alex = new User({ name: 'Alex' });  
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zach = new User({ name: 'Zach' });  // create user in memory only but with _id assigned //
    
    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
      .then(() => done());
  });

  it('finds all users with a name of Joe', (done) => {
    // Querying the db for users //
    User.find({ name: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe');
        done();
      });
  });

});