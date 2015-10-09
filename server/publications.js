Meteor.publish('pools', function() {
  return Pools.find();
});

Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.publish('requests', function(userId) {
  return PoolRequest.find(
    {$or: [
      {authorId: userId},
      {requestId: userId}
    ]
  });
});

Meteor.publish('userPosts', function(userId) {
  return Pools.find({author: userId});
});
