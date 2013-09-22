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

}

if (Meteor.isClient) {
  Meteor.subscribe('all-posts');
}
