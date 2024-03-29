//tests/posts.js
var assert = require('assert');

suite('Posts', function() {
  test('in the server', function(done, server) {
    server.eval(function() {
      Posts.insert({title: 'hello title'});
      var docs = Posts.find().fetch();
      emit('docs', docs);
    });

    server.once('docs', function(docs) {
      assert.equal(docs.length, 1);
      done();
    });
  });

  test('using both client and the server', function(done, server, client) {
    server.eval(function() {
      Accounts.createUser({email: 'a@a.com', password: '123456'});
      Posts.find().observeChanges({
        added: function(id, doc) {
          emit('post', doc);
        }
      });
    }).once('post', function(post) {
      assert.equal(post.title, 'hello title');
      done();
    });

    client.eval(function() {
      Meteor.loginWithPassword('a@a.com', '123456', function() {
        Posts.insert({title: 'hello title'});
      });
    });

  });

});

  // test('using two client', function(done, server, c1, c2) {
  //   c1.eval(function() {
  //     Posts.find().observeChanges({
  //       added: addedNewPost
  //     });

  //     function addedNewPost(id, doc) {
  //       emit('post', doc);
  //     }
  //     emit('done');
  //   }).once('post', function(post) {
  //     assert.equal(post.title, 'from c2');
  //     done();
  //   }).once('done', function() {
  //     c2.eval(insertPost);
  //   });

  //   function insertPost() {
  //     Posts.insert({title: 'from c2'});
  //   }
  // });
