const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))  // {} - to find all records //
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type set n save', (done) => {
    joe.set('name', 'Alex');  // no update to db //
    assertName(joe.save(), done);
  });

  // it('A model instance can update', (done) => {
  //   assertName(joe.update({ name: 'Alex' }), done);
  // });

  // it('A model class can update', (done) => {
  //   assertName(
  //     User.update({ name: 'Joe' }, { name: 'Alex' }),
  //     done
  //   );
  // });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done
    );
  });

  // omit a test from the suite by adding an x in fron tof it => xit //
  // it('A user can have their likes incremented / set', (done) => {
  //   User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
  //     .then(() => User.findOne({ name: 'Joe' }))
  //     .then((user) => {
  //       assert(user.likes === 10);
  //       done();
  //     });
  // });

  it('A user can have their postcount incremented by 10', (done) => {
    User.updateOne({ name: 'Joe' }, { $inc: { postCount: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 10);
        done();
      });
  });

});