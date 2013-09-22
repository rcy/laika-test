var assert = require('assert');

suite('Base test', function() {
  test('ensure laika sanity', function(done) {
    assert.equal(true, true);
    done();
  });

  test('ensure server sanity', function(done, server) {
    server.eval(function() {
      var server = Meteor.isServer;
      emit('server', server);
    }).once('server', function(server) {
      assert.equal(server, true);
      done();
    });
  });

  test('ensure client sanity', function(done, server, client) {
    client.eval(function() {
      var client = Meteor.isClient;
      emit('client', client);
    }).once('client', function(client) {
      assert.equal(client, true);
      done();
    });
  });
});
