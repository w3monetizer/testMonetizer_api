const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{
        title: 'PostTitle',
        sheet: [
          ['A', 'B', 'C'],
          ['1 + 1', '=', '?']
        ]
      }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        // console.log('eval(user.posts[0].sheet[1][0]) = ',
        //  eval(user.posts[0].sheet[1][0]));
        assert(user.posts[0].sheet[1][0] === '1 + 1');
        done();
      });
  });

  it('Can add subdocuments to an existing record', (done) => {
    // Create a record, save it, pull it from db, add a post to it, and check post was added properly //
    const joe = new User({
      name: 'Joe',
      posts: []     // for future engineers to know Joe started with a blank list of posts //
    });

  joe.save()
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      user.posts.push({ title: 'New Post' })
      return user.save();
    })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user.posts[0].title === 'New Post')
      done();
    });
  });

    it('Can add a row to a spreadsheet in a subdocument of an existing record', (done) => {
    // Create a record, save it, pull it from db, add/save a post with new row in sheet[], and check new row was added properly //
    const joe = new User({
      name: 'Joe',
      posts: [{
        title: 'PostTitle',
        sheet: [
          ['A', 'B', 'C'],
          ['1 + 1', '=', '?']
        ]
      }]     
    });

  joe.save()
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      user.posts[0].sheet.push(['test', 'row']);
      return user.save();
    })
    .then(() => User.findOne({ name: 'Joe' }))
    .then((user) => {
      assert(user.posts[0].sheet[2][1] === 'row')
      done();
    });
  });

});