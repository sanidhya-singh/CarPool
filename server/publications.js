Meteor.publish('pools', function() {
  return Pools.find();
});

Meteor.publish('users', function() {
  return Meteor.users.find();
});
