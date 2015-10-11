Meteor.publish('pools', function(options) {
  return Pools.find({}, options);
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

Meteor.publish('singlePool', function(id) {
  return Pools.find(id);
});

Meteor.publish('searchPools', function(options) {
  return Pools.find(options);
});
