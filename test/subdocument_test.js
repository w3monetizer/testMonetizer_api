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
        console.log('eval(user.posts[0].sheet[1][0]) = ',
          eval(user.posts[0].sheet[1][0]));
        assert(user.posts[0].sheet[1][0] === '1 + 1');
        done();
      });
  });
});