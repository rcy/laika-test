Posts = new Meteor.Collection('posts');

if (Meteor.isServer) {
  Posts.allow({
    insert: function(userId, doc) {
      if (userId)
        return true;
      else
        return false;
    }
  });


  Meteor.publish('all-posts', function() {
    return Posts.find();
  });

  Meteor.publish('custom-posts', function() {
    var sub = this;
    var cursor = Posts.find({}, {fields: {name: 1}});
    var handle = cursor.observeChanges({
      added: function(id, doc) {
        sub.added('posts', id, doc);
      },
      // changed: function(id, fields) {
      //   sub.changed('posts', id, fields);
      // }
    });
    sub.ready();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('custom-posts');
  Meteor.subscribe('all-posts');
}
