const assert = require('assert');
const Auth = require('../dist/bundle');

let auth;

describe('Security', function() {

  describe('#isAuthenticated()', function() {

    beforeEach(function() {
      auth = new Auth();
    });

    it('should return false when not authenticated', function() {
      assert.equal(auth.isAuthenticated(), false);
    });

    it('should return true when authenticated', function() {
      auth.authenticate();
      assert.equal(auth.isAuthenticated(), true);
    });

  });

});
