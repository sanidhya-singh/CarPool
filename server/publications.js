Meteor.publish('pools', function() {
  return Pools.find();
});
