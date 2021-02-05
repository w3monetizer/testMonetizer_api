const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  // Create records with Mongoose - not saved in DB //
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    // not saving to db but just validating locally
    const validationResult = user.validateSync();
    // console.log(validationResult);
    const { message } = validationResult.errors.name;
    // console.log(message);  // => Name is required.

    assert(message === 'Name is required.');

    // or Async validation to allow for longer processing, http, etc:
    // user.validate((validationResult) => {
    //   // longer async validation proces
    //   // eg: Run cross reference scripts on W3 sheets (project, service)
    //   //     - and validate all results are passing OK / no Stopper, Abort 
    // });
  });
});