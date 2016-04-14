var constants = require.requireActual('../../../../common/constants');
var session = require.requireActual('../session');

describe('session', () => {
  beforeEach(() => {
  });
  describe('users', () => {
    it('Should add users', () => {
      var store = {};
      console.log(session);

      var res = session.default(store, {type: constants.NEW_USER, users: ['user 1', 'user 2']});

      expect(res).toEqual(jasmine.objectContaining({
        users: ['user 1', 'user 2']
      }));
    });
  });
});
